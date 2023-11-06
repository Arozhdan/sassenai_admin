export default {
  routes: [
    {
      method: 'POST',
      path: '/chat-message',
      handler: 'api::chat.chat.message',
    },
    {
      method: 'GET',
      path: '/chat-message',
      handler: 'api::chat.chat.messages',
    }, {
      method: 'GET',
      path: '/chat-new',
      handler: 'api::chat.chat.new',
    }, {
      method: 'POST',
      path: '/chat-rename',
      handler: 'api::chat.chat.rename',
    }, {
      method: 'POST',
      path: '/chat-delete',
      handler: 'api::chat.chat.deleteChat', 
    }
  ]
}