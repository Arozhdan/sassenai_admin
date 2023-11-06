/**
 * order controller
 */

import { factories } from '@strapi/strapi'
import { Context } from 'koa'
import { Order } from './types/orders.interface'
import { handleOrderNotification } from './handlers/handleOrderNotification'

async function orderCallbackController(ctx: Context) {
  try {
    const notification = ctx.request.body as Order
    console.log('------------------\n\n');

    console.log('notification ' + JSON.stringify(notification, null, 2));

    console.log('------------------\n\n');


    return handleOrderNotification(notification, ctx)


  } catch (e) {
    console.log(e);
    ctx.badRequest(e)
  }

}


export default factories.createCoreController('api::order.order', () => ({
  orderCallback: orderCallbackController,
}))