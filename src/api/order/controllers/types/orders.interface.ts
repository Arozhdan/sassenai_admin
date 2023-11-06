export interface Order {
  order_id: string
  date: string
  order_num: string
  domain: string
  sum: number
  customer_email: string
  payment_type: string
  comission: number
  customer: string
  subscription: any
  payment_status: string
  attempt: number
  subscription_date_start: string
  subscription_demo_period: number
  payment_status_description: string
  subscription_limit_autopayments: number
}

export interface Subscription {
  id: string
  profile_id: string
  cost: number
  name: string
  limit_autopayments: number
  autopayments_num: number
  autopayment: 0 | 1
  date_create: string
  date_first_payment: string
  date_last_payment: string
  date_next_payment: string
  current_attempt: number
  payment_num: number
  type: string
  action_code: string
  payment_date: string
  notification_code: string
  active: string
  active_manager: string
  active_user: string
  error: string
  error_code: string
  last_attempt: "yes" | "no"
}