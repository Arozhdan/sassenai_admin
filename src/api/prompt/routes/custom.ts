export default {
  routes: [
    {
      method: 'POST',
      path: '/prompt-favorite',
      handler: 'api::prompt.prompt.favoritePrompt',
    },
    {
      method: 'POST',
      path: '/prompt-unfavorite',
      handler: 'api::prompt.prompt.unfavoritePrompt',
    },
  ]
}