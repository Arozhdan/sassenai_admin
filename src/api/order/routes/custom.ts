export default {
  routes: [
    {
      method: 'POST',
      path: '/order-callback',
      handler: 'api::order.order.orderCallback',
    }
  ]
}