// src/extensions/users-permissions/strapi-server.js
// this route is only allowed for authenticated users
import mime from 'mime-types';
import fs from 'fs';
import _ from 'lodash';
import {
  ApplicationError, ValidationError
} from '@strapi/utils/lib/errors';

import utils from '@strapi/utils';
import { validateRegisterBody } from "@strapi/plugin-users-permissions/server/controllers/validation/auth";
import { getService } from "@strapi/plugin-users-permissions/server/utils";
import {
  validateCallbackBody,
  validateEmailConfirmationBody
} from "@strapi/plugin-users-permissions/server/controllers/validation/auth";

const rootDir = process.cwd();

const sanitizeUser = (user, ctx) => {
  const { auth } = ctx.state;
  const userSchema = strapi.getModel('plugin::users-permissions.user');

  return sanitize.contentAPI.output(user, userSchema, { auth });
};
const { sanitize } = utils;


export default (plugin) => {


  plugin.controllers.auth.callback = async (ctx) => {
    const provider = ctx.params.provider || 'local';
    const params = ctx.request.body;

    const store = strapi.store({ type: 'plugin', name: 'users-permissions' });
    const grantSettings = await store.get({ key: 'grant' });

    const grantProvider = provider === 'local' ? 'email' : provider;

    if (!_.get(grantSettings, [grantProvider, 'enabled'])) {
      throw new ApplicationError('This provider is disabled');
    }

    if (provider === 'local') {
      await validateCallbackBody(params);

      const { identifier } = params;

      // Check if the user exists.
      const user = await strapi.query('plugin::users-permissions.user').findOne({
        where: {
          provider,
          $or: [{ email: identifier.toLowerCase() }, { username: identifier }],
        },
        populate: ['image', 'favPrompts']
      });

      if (!user) {
        return ctx.badRequest(null, 'Имя пользователя / E-mail не найдены');
      }

      if (!user.password) {
        return ctx.badRequest(null, 'Имя пользователя / E-mail не найдены');
      }

      const validPassword = await getService('user').validatePassword(
        params.password,
        user.password
      );

      if (!validPassword) {
        return ctx.badRequest(null, 'Имя пользователя / E-mail не найдены');
      }

      const advancedSettings = await store.get({ key: 'advanced' });
      const requiresConfirmation = _.get(advancedSettings, 'email_confirmation');

      if (requiresConfirmation && user.confirmed !== true) {
        return ctx.badRequest(null, 'Вы не подтвердили свой адрес электронной почты.');
      }

      if (user.blocked === true) {
        return ctx.badRequest(null, 'Ваша учетная запись заблокирована.');
      }

      return ctx.send({
        jwt: getService('jwt').issue({ id: user.id }),
        user: await sanitizeUser(user, ctx),
      });
    }

    // Connect the user with the third-party provider.
    try {
      const user = await getService('providers').connect(provider, ctx.query);

      return ctx.send({
        jwt: getService('jwt').issue({ id: user.id }),
        user: await sanitizeUser(user, ctx),
      });
    } catch (error) {
      throw new ApplicationError(error.message);
    }
  }

  plugin.controllers.auth.register = async (ctx) => {
    const pluginStore = await strapi.store({ type: 'plugin', name: 'users-permissions' });

    const settings = await pluginStore.get({ key: 'advanced' });

    if (!settings.allow_register) {
      throw new ApplicationError('Register action is currently disabled');
    }

    const params = {
      ..._.omit(ctx.request.body, [
        'confirmed',
        'blocked',
        'confirmationToken',
        'resetPasswordToken',
        'provider',
        'id',
        'createdAt',
        'updatedAt',
        'createdBy',
        'updatedBy',
        'role',
      ]),
      provider: 'local',
    };

    await validateRegisterBody(params);

    const role = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: settings.default_role } });

    if (!role) {
      throw new ApplicationError('Impossible to find the default role');
    }

    const { email, username, provider } = params as any;

    const identifierFilter = {
      $or: [
        { email: email.toLowerCase() },
        { username: email.toLowerCase() },
        { username },
        { email: username },
      ],
    };

    const conflictingUserCount = await strapi.query('plugin::users-permissions.user').count({
      where: { ...identifierFilter, provider },
    });

    if (conflictingUserCount > 0) {
      return ctx.badRequest(
        'ValidationError',
        'Email или имя пользователя уже заняты'
      )

    }

    if (settings.unique_email) {
      const conflictingUserCount = await strapi.query('plugin::users-permissions.user').count({
        where: { ...identifierFilter },
      });

      if (conflictingUserCount > 0) {
        ctx.badRequest(
          'ValidationError',
          'Email или имя пользователя уже заняты'
        )
      }
    }

    const newUser = {
      ...params,
      role: role.id,
      email: email.toLowerCase(),
      username,
      confirmed: !settings.email_confirmation,
    };

    const user = await getService('user').add(newUser);

    const sanitizedUser = await sanitizeUser(user, ctx);

    if (settings.email_confirmation) {
      try {
        await getService('user').sendConfirmationEmail(sanitizedUser);
      } catch (err) {
        throw new ApplicationError(err.message);
      }

      return ctx.send({ user: sanitizedUser });
    }

    const jwt = getService('jwt').issue(_.pick(user, ['id']));

    return ctx.send({
      jwt,
      user: sanitizedUser,
    });
  },

    plugin.controllers.auth.emailConfirmation = async (ctx, next, returnUser) => {
      const { confirmation: confirmationToken } = await validateEmailConfirmationBody(ctx.query);

      const userService = getService('user');
      const jwtService = getService('jwt');

      const [user] = await userService.fetchAll({ filters: { confirmationToken } });

      if (!user) {
        throw new ValidationError('Invalid token');
      }

      await userService.edit(user.id, { confirmed: true, confirmationToken: null });
      const defaultSubscription = await strapi.query('api::subscribtion.subscribtion').create({
        data: {
          user: user.id,
          name: 'Бесплатный',
          cost: 0,
          dateFirstPayment: new Date(),
          status: 'active',
          active: '1'
        }
      });
      if (returnUser) {
        ctx.send({
          jwt: jwtService.issue({ id: user.id }),
          user: await sanitizeUser(user, ctx),
        });
      } else {
        const settings = await strapi
          .store({ type: 'plugin', name: 'users-permissions', key: 'advanced' })
          .get();

        ctx.redirect(settings.email_confirmation_redirection || '/');
      }
    },

    /*******************************  CUSTOM CONTROLERS  ********************************/
    plugin.controllers.user.updateLoggedInUser = async (ctx) => {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized('Вы должны войти в систему, чтобы выполнить это действие');
      }

      await strapi.query('plugin::users-permissions.user').update({
        where: { id: ctx.state.user.id },
        data: ctx.request.body.data
      }).then((res) => {
        ctx.response.status = 200;
      })
    }

  plugin.controllers.user.uploadUserImage = async (ctx) => {
    try {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized('Вы должны войти в систему, чтобы выполнить это действие');
      }

      const body = ctx.request.body;
      const file = body.file;

      if (!file) {
        return ctx.badRequest('No file provided');
      }
      console.log(file);


      const fileName = 'User' + new Date().toDateString() + '.' + file.path.split('.').pop();
      const filePath = rootDir + '/public/uploads/' + fileName;
      const stats = fs.statSync(filePath);

      // save file to strapi upload folder
      const upload = await strapi.plugins.upload.services.upload.upload({
        data: {
          refId: user.id,
          ref: 'user',
          field: 'image',
          source: 'users-permissions',
          files: {
            path: filePath,
            name: fileName,
            type: mime.getType(filePath),
            size: stats.size,
          }
        },
      });

      const userRecord = await strapi.query('plugin::users-permissions.user').update({
        where: { id: user.id },
        data: { image: upload.id },
        populate: ['image']
      })

      ctx.send(userRecord);
    } catch (e) {
      console.log(e);
      ctx.badRequest(null, e.message);
    }


  }


  /*******************************  CUSTOM ROUTES  ********************************/
  plugin.routes["content-api"].routes.push(
    {
      method: "POST",
      path: "/user/updateLoggedInUser",
      handler: "user.updateLoggedInUser",
      config: {
        prefix: "",
        policies: []
      }
    },
    {
      method: "POST",
      path: "/user/uploadUserImage",
      handler: "user.uploadUserImage",
      config: {
        prefix: "",
        policies: []
      }
    }
  );

  return plugin;
};
