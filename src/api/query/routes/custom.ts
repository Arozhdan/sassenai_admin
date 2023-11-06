export default {
  routes: [
    {
      method: 'POST',
      path: '/query',
      handler: 'api::query.query.generateQuery',
    },
    {
      method: 'GET',
      path: '/query',
      handler: 'api::query.query.getMyQueries',
    },
    {
      method: 'POST',
      path: '/query-save',
      handler: 'api::query.query.saveQuery',
    },
    {
      method: 'POST',
      path: '/query-unsave',
      handler: 'api::query.query.unsaveQuery',
    },
    {
      method: 'DELETE',
      path: '/query-delete',
      handler: 'api::query.query.deleteQuery',
    }
  ]
}