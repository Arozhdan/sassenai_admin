/**
 * chat controller
 */

import { factories } from '@strapi/strapi'
import { Context } from 'koa'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


async function createChatRecord(message: string, user) {
  const messagesJson = message ? { role: 'user', content: message } : null
  const chatRecord = await strapi.query('api::chat.chat').create({
    data: {
      messages: messagesJson ? [messagesJson] : [],
      user
    }

  })
  return chatRecord
}

async function updateChatRecord(message: string, chatId: number, userId?: number) {
  console.log('UPDATE CHAT RECORD', message,);
  const messagesJson = { role: userId ? 'user' : 'assistant', content: message }
  const chatRecord = await strapi.query('api::chat.chat').findOne({
    where: { id: chatId },
  })

  if (!chatRecord) return null

  const existingMessages = chatRecord.messages

  existingMessages.push(messagesJson)

  const updatedChatRecord = await strapi.query('api::chat.chat').update({
    where: { id: chatId },
    data: { messages: existingMessages }
  })
  return updatedChatRecord
}

async function generateResponse(messages, chatId) {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages.slice(-4),
      max_tokens: 2000,
    })
    if (!completion?.data?.choices.length) return null;
    const { message } = completion.data.choices[0];

    console.log('generated message: ', message);

    await updateChatRecord(message.content, chatId);

    return message.content


  } catch (e) {
    console.log(e);
    return null
  }
}


async function chatMessageController(ctx: Context) {
  try {
    const { user } = ctx.state;
    if (!user)
      return ctx.unauthorized('Вы должны войти в систему, чтобы выполнить это действие', 'Вы должны войти в систему, чтобы выполнить это действие');
    const { id, currentUsage } = user;


    const subscriptionRecord = await strapi.query('api::subscribtion.subscribtion').findOne({
      where: { user: id },
    });

    if (!subscriptionRecord) return ctx.badRequest('Мы не смогли найти вашу подписку', 'Мы не смогли найти вашу подписку');

    const { gptUsageLimit } = subscriptionRecord;

    if (currentUsage >= gptUsageLimit) return ctx.badRequest('Вы превысили лимит использования GPT-3', 'Вы превысили лимит использования GPT-3');

    const { message, chatId }: { message: string, chatId: number } = ctx.request.body;

    if (!message) return ctx.badRequest('Не указано сообщение', 'Не указано сообщение');

    let chatRecord;
    if (!chatId) chatRecord = await createChatRecord(message, id);
    else chatRecord = await updateChatRecord(message, chatId, id);

    if (!chatRecord) return ctx.badRequest('Не удалось установить чат', 'Не удалось установить чат');

    const { messages } = chatRecord;

    const gptResponse = await generateResponse(messages, chatRecord.id);

    if (!gptResponse) return ctx.badRequest('Не удалось сгенерировать ответ', 'Не удалось сгенерировать ответ');

    console.log('gptResponse', gptResponse);

    ctx.send({
      data: [
        {
          role: 'assistant',
          content: gptResponse,
        }
      ],
    })

  } catch (e) {
    ctx.badRequest(null, e.message);

  }
}

async function getMyChatsController(ctx: Context) {
  try {
    const { user } = ctx.state;
    if (!user)
      return ctx.unauthorized('Вы должны войти в систему, чтобы выполнить это действие');
    const { id } = user;

    const chatRecords = await strapi.query('api::chat.chat').findMany({
      where: { user: id },
    })

    ctx.send({
      data: chatRecords,
    })

  } catch (e) {
    ctx.badRequest(null, e.message);
  }
}


async function newChatController(ctx: Context) {
  try {
    const user = ctx.state.user;
    if (!user)
      return ctx.unauthorized('Вы должны войти в систему, чтобы выполнить это действие');
    const { id } = user;

    const chatRecord = await createChatRecord(null, id);

    ctx.send({
      data: chatRecord,
    })

  } catch (e) {

  }
}

async function renameChat(ctx: Context) {
  try {
    const { user } = ctx.state;
    if (!user)
      return ctx.unauthorized('Вы должны войти в систему, чтобы выполнить это действие');
    const chatIdFromBody = ctx.request.body.chatId;
    const chatNameFromBody = ctx.request.body.chatName;
    if (!chatIdFromBody) return ctx.badRequest('Не указан чат', 'Не указан чат');
    if (!chatNameFromBody) return ctx.badRequest('Не указано имя чата', 'Не указано имя чата');

    const chatId = Number(chatIdFromBody);
    await strapi.query('api::chat.chat').update({
      where: { id: chatId },
      data: { name: chatNameFromBody }
    })

    return ctx.send({
      data: {
        chatId,
        chatName: chatNameFromBody
      }
    })

  } catch (e) {
    return ctx.badRequest(null, e.message);
  }
}

async function deleteChat(ctx: Context) {
  try {
    const { user } = ctx.state;
    if (!user)
      return ctx.unauthorized('Вы должны войти в систему, чтобы выполнить это действие');
    const chatIdFromBody = ctx.request.body.chatId;
    if (!chatIdFromBody) return ctx.badRequest('Не указан чат', 'Не указан чат');

    const chatId = Number(chatIdFromBody);
    await strapi.query('api::chat.chat').delete({
      where: { id: chatId },
    })

    return ctx.send({
      data: {
        chatId,
      }
    })

  } catch (e) {
    return ctx.badRequest(null, e.message);
  }
}


export default factories.createCoreController('api::chat.chat', () => ({
  message: chatMessageController,
  messages: getMyChatsController,
  new: newChatController,
  rename: renameChat,
  deleteChat: deleteChat
}))
