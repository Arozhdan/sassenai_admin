/**
 * query controller
 */

import { factories, Strapi } from '@strapi/strapi'
import { Context } from 'koa'
import { Configuration, OpenAIApi } from 'openai'

interface RequestBody {
  input: string;
  query: string;
  relatedPrompt: string;
  title: string;
  lang: string;
}
interface SaveQueryRequestBody {
  queryId: number;
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const createQueryRecors = async (data) => {
  const queryRecord = await strapi.query('api::query.query').create({
    populate: ['user', 'prompt'],
    data
  })
  delete queryRecord.user.password;
  delete queryRecord.user.resetPasswordToken;
  delete queryRecord.user.confirmationToken;

  return queryRecord

}


async function deleteQueryController(ctx: Context) {
  try {
    const { user } = ctx.state;
    if (!user) return ctx.unauthorized('You must be logged in to perform this action');

    let { queryIds } = ctx.request.query;

    if (typeof queryIds === 'string') {
      queryIds = queryIds.split(',').map(Number);
    }

    if (!queryIds) return ctx.badRequest(null, 'No queryIds provided');
    if (!queryIds.length) return ctx.badRequest(null, 'No queryIds provided');

    queryIds.forEach(async (queryId) => {
      try {
        await strapi.entityService.delete('api::query.query', queryId);
      } catch (e) {
        console.log('ERROR DELETING', e);
        ctx.badRequest(null, e.message);
      }
    });

    ctx.send('OK');

  } catch (e) {
    ctx.badRequest(null, e.message);
  }
}

async function saveQueryController(ctx: Context) {
  try {
    const { user } = ctx.state;
    if (!user) return ctx.unauthorized('You must be logged in to perform this action');

    const { queryId }: SaveQueryRequestBody = ctx.request.body;
    if (!queryId) return ctx.badRequest(null, 'No queryId provided');

    const queryRecord = await strapi.query('api::query.query').update({
      where: { id: queryId },
      data: { store: true }
    })

    ctx.send('OK');
  } catch (e) {
    ctx.badRequest(null, e.message);
  }
}

async function unsaveQueryController(ctx: Context) {
  try {
    const { user } = ctx.state;
    if (!user) return ctx.unauthorized('You must be logged in to perform this action');

    const { queryId }: SaveQueryRequestBody = ctx.request.body;
    if (!queryId) return ctx.badRequest(null, 'No queryId provided');

    const queryRecord = await strapi.query('api::query.query').update({
      where: { id: queryId },
      data: { store: false }
    })
    ctx.send('OK');
  } catch (e) {
    ctx.badRequest(null, e.message);
  }
}

async function generateQueryController(ctx: Context) {
  try {
    const { user } = ctx.state;
    if (!user) {
      return ctx.unauthorized('Вы должны войти в систему, чтобы выполнить это действие');
    }
    const { id, currentUsage } = user;

    const subscription = await strapi.query('api::subscribtion.subscribtion').findOne({
      where: { user: id },
    });

    if (!subscription) return ctx.badRequest(null, 'Мы не смогли найти вашу подписку');

    const { gptUsageLimit, status } = subscription;

    if (status !== 'active') return ctx.badRequest(null, 'Ваша подписка не активна');

    if (gptUsageLimit !== -1 && currentUsage >= gptUsageLimit) return ctx.badRequest(null, 'Вы превысили лимит использования');


    const data: RequestBody = ctx.request.body;

    if (!data) return ctx.badRequest(null, 'No data provided');
    if (!data.input) return ctx.badRequest(null, 'No input provided');
    if (!data.query) return ctx.badRequest(null, 'No query provided');
    if (!data.relatedPrompt) return ctx.badRequest(null, 'No relatedPrompt provided');
    if (!data.title) return ctx.badRequest(null, 'No title provided');
    if (!data.lang) return ctx.badRequest(null, 'No lang provided');

    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
          role: 'user',
          content: data.query
        }],
        max_tokens: 3000,
      })

      if (!completion?.data?.choices.length) return ctx.badRequest(null, 'No response from OpenAI');
      const { message } = completion.data.choices[0];

      const queryRecord = await createQueryRecors({ ...data, user: id, prompt: data.relatedPrompt, result: message.content });
      ctx.send({
        data: queryRecord,
      });

      await strapi.query('plugin::users-permissions.user').update({
        where: { id: user.id },
        data: { currentUsage: currentUsage + 1 }
      })

    } catch (e) {
      const { response } = e;
      ctx.badRequest(null, response?.data?.error?.message || e.message);
    }
  } catch (e) {
    console.log('ERROR IN CONTROLLER', e);
    ctx.badRequest(null, e.message);
  }
}

async function getMyQueriesController(ctx: Context) {
  try {
    const { user } = ctx.state;
    if (!user) {
      return ctx.unauthorized('Вы должны войти в систему, чтобы выполнить это действие');
    }
    const { id } = user;
    const queryRecords = await strapi.query('api::query.query').findMany({
      where: { user: id },
      populate: ['user', 'prompt'],
      orderBy: [{ createdAt: 'DESC' }],
    })
    if (!queryRecords.length) return ctx.send({
      data: [],
    })

    try {
      queryRecords.forEach((queryRecord) => {
        delete queryRecord.user.password;
        delete queryRecord.user.resetPasswordToken;
        delete queryRecord.user.confirmationToken;
      })
    } catch (e) {
      console.log('e', e);
    }
    ctx.send({
      data: queryRecords,
    });
  } catch (e) {
    ctx.badRequest(null, e.message);
  }
}


export default factories.createCoreController('api::query.query', () => ({
  generateQuery: generateQueryController,
  getMyQueries: getMyQueriesController,
  saveQuery: saveQueryController,
  unsaveQuery: unsaveQueryController,
  deleteQuery: deleteQueryController,
}));
