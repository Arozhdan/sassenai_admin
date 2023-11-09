export default {
  routes: [
    {
      method: 'POST',
      path: '/order-callback',
      handler: 'api::order.order.orderCallback',
    },
    {
      method: 'POST',
      path: '/cancel-subscription',
      handler: 'api::order.order.cancelSubscription',
    }
  ]
}