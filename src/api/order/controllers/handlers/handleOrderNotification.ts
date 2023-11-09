import { Order } from "../types/orders.interface";
import { Context } from 'koa'

const mapSubscribtionDataWithApi = (data: Order['subscription'], customerId: number) => {
  let gptUsageLimit = null
  switch (data.id) {
    case '1518595':
      gptUsageLimit = 200
      break
    case '1519620':
      gptUsageLimit = -1
      break
    default:
      gptUsageLimit = 150
      break
  }
  return {
    produmusId: data.id,
    profileId: data.profile_id,
    cost: data.cost,
    name: data.name,
    limitAutopayments: data.limit_autopayments,
    autopaymentsNum: data.autopayments_num,
    createdAt: data.date_create,
    dateFirstPayment: data.date_first_payment,
    dateLastPayment: data.date_last_payment,
    dateNextPayment: data.date_next_payment,
    currentAttempt: data.current_attempt,
    paymentNum: data.payment_num,
    type: data.type,
    actionCode: data.action_code,
    paymentDate: data.payment_date,
    notificationCode: data.notification_code,
    active: parseInt(data.active_user) === 1 && parseInt(data.active_manager) === 1 ? 'active' : 'suspended',
    gptUsageLimit,
    user: customerId,
    chatAccess: gptUsageLimit === -1 ? true : false

  }
}

async function createSubscription(data: Order['subscription'], customerId: number, ctx: Context) {
  try {
    return await strapi.query('api::subscribtion.subscribtion').create({
      data: mapSubscribtionDataWithApi(data, customerId)
    })
  } catch (e) {
    console.log(e)
    ctx.badRequest(e)
  }
}

async function updateSubscription(data: Order['subscription'], customerId: number, ctx: Context) {
  try {
    await strapi.query('api::subscribtion.subscribtion').update({
      where: { user: customerId },
      data: mapSubscribtionDataWithApi(data, customerId)
    })

  } catch (e) {
    console.log(e)
    ctx.badRequest(e)
  }

}

async function createOrderRecord(data: Order, customerId: number | null, subscriptionId: number | null, ctx: Context) {
  try {
    const orderRec = await strapi.query('api::order.order').create({
      data: {
        date: data.date,
        orderId: data.order_id,
        orderNum: data.order_num,
        domain: data.domain,
        sum: data.sum,
        customerEmail: data.customer_email,
        paymentType: data.payment_type,
        comission: data.comission,
        customer: customerId,
        subscription: subscriptionId,
        paymentStatus: data.payment_status,
        paymentStatusDescription: data.payment_status_description,
        attempt: data.attempt,
        subscriptionDateStart: data.subscription_date_start,
        subscriptionDemoPeriod: data.subscription_demo_period,
        subscriptionLimitAutopayments: data.subscription_limit_autopayments,
        devNotes: customerId && subscriptionId ? null : {
          data,
          customerId,
          subscriptionId
        }
      }
    })

    if (!customerId) return ctx.badRequest('Customer was not found in the database')
    if (!subscriptionId) return ctx.badRequest('Subscription was not found in the database')

    return ctx.send({
      order: orderRec,
      dateHandle: new Date(),
      subscription: subscriptionId,
      customer: customerId
    })
  } catch (e) {
    console.log(e)
    ctx.badRequest(e)
  }
}

export async function handleOrderNotification(notification: Order, ctx: Context) {
  try {
    const { customer_email } = notification
    if (!customer_email) return ctx.badRequest('Customer email is not provided')

    const customer = await strapi.query('plugin::users-permissions.user').findOne({
      where: { email: customer_email }
    })
    if (!customer) return await createOrderRecord(notification, null, null, ctx)

    let customerSubscription = await strapi.query('api::subscribtion.subscribtion').findOne({
      where: { user: customer.id }
    })

    if (!customerSubscription) customerSubscription = await createSubscription(notification, customer.id, ctx)
    else await updateSubscription(notification.subscription, customer.id, ctx)

    return await createOrderRecord(notification, customer.id, customerSubscription.id, ctx)

  } catch (e) {
    console.log(e)
    ctx.badRequest(e)
  }

}