/**
 * prompt controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::prompt.prompt', () => ({
  async favoritePrompt(ctx) {
    const { user } = ctx.state;
    if (!user) {
      return ctx.unauthorized('You must be logged in to perform this action');
    }
    const { id } = user;
    const { promptId } = ctx.request.body;
    if (!promptId) return ctx.badRequest(null, 'No promptId provided');

    try {
      //@ts-ignore
      const userRecord = await strapi.query('plugin::users-permissions.user').findOne({ id, populate: ['favPrompts'] });

      const existingPrompts = userRecord.favPrompts || [];

      await strapi.query('plugin::users-permissions.user').update({
        where: { id },
        data: { favPrompts: [...existingPrompts, promptId] },
      });
      ctx.send('OK');
    } catch (e) {
      console.log(e);
      ctx.badRequest(null, e.message);
    }

  },
  async unfavoritePrompt(ctx) {
    const { user } = ctx.state;
    if (!user) {
      return ctx.unauthorized('You must be logged in to perform this action');
    }
    const { id } = user;
    const { promptId } = ctx.request.body;
    if (!promptId) return ctx.badRequest(null, 'No promptId provided');

    try {
      //@ts-ignore
      const userRecord = await strapi.query('plugin::users-permissions.user').findOne({ id, populate: ['favPrompts'] });
      await strapi.query('plugin::users-permissions.user').update({
        where: { id },
        data: { favPrompts: userRecord.favPrompts.filter((p) => p.id !== promptId) },
      });

      ctx.send('OK');
    } catch (e) {
      console.log(e);
      ctx.badRequest(null, e.message);
    }
  },
}))
