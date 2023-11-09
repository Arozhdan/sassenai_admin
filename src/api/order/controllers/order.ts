/**
 * order controller
 */

import { factories } from '@strapi/strapi'
import { Context } from 'koa'
import { Order } from './types/orders.interface'
import { handleOrderNotification } from './handlers/handleOrderNotification'
import { Hmac } from './hmac'
import axios from 'axios'
import fetch from 'node-fetch'

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


async function cancelSubscriptionController(ctx: Context) {
  try {
    console.log('------------------\n\n');

    console.log('cancelSubscription ' + JSON.stringify(ctx.request.body, null, 2));

    const { subscriptionId, email } = ctx.request.body
    if (!subscriptionId) return ctx.badRequest('ID Подписки не указан')
    const url = 'https://sassenai.payform.ru/rest/setActivity'
    const key = '325620b7a24ba3dd85767577c3fff7b3551c8d4634387dc351ea00a9b76a931e'

    const data = {
      subscription: subscriptionId,
      customer_email: email,
      active_user: false,
    } as any

    data.signature = Hmac.create(data, key)


    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    //   body: new URLSearchParams(data).toString()
    // }




    // fetch(url + '?' + new URLSearchParams(data).toString(), requestOptions)
    //   .then(res => res.text())
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err))

    const reqUrl = url + '?' + new URLSearchParams(data).toString()
    const response = await axios.post(reqUrl, {
      subscription: subscriptionId,
      customer_email: email,
      active_user: false,
      signature: data.signature
    }, {
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }
    })

    console.log(response);







  } catch (e) {
    console.log(e);
  }
}


export default factories.createCoreController('api::order.order', () => ({
  orderCallback: orderCallbackController,
  cancelSubscription: cancelSubscriptionController
}))