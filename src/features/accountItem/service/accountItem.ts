import supabase from '@/supabase/supabase'

import dayjs from 'dayjs'
import type { AccountItem } from '../model/types'

export const fetchByMonth = async (year: number, month: number) => {
  const base = dayjs().year(year).month(month)
  const startDate = base.startOf('month').format('YYYY-MM-DD')
  const endDate = base.endOf('month').format('YYYY-MM-DD')

  const { data, error } = await supabase
    .from('account_items')
    .select(
      `
      *,
      category_id, recurring_rule_id, payment_method_id, installment_plan_id,
      categories:categories!account_items_category_id_fkey(name, korean_name),
      recurring_rules:recurring_rules!account_items_recurring_rule_id_fkey(frequency, end_date),
      payment_methods:payment_methods!account_items_payment_method_id_fkey(type),
      installment_plans:installment_plans!account_items_installment_plan_id_fkey(months, start_date, end_date)
    `
    )
    .gte('date', startDate)
    .lte('date', endDate)

  if (error) throw error
  return data
}

export const fetchAllItems = async () => {
  const { data, error } = await supabase.from('account_items').select(
    `
    *,
    category_id, recurring_rule_id, payment_method_id, installment_plan_id,
    categories:categories!account_items_category_id_fkey(name, korean_name),
    recurring_rules:recurring_rules!account_items_recurring_rule_id_fkey(frequency, end_date),
    payment_methods:payment_methods!account_items_payment_method_id_fkey(type),
    installment_plans:installment_plans!account_items_installment_plan_id_fkey(months, start_date, end_date)
  `
  )

  if (error) throw error
  return data
}

export const createRecurringItem = async (recurringItems: AccountItem[]) => {
  const sendData = recurringItems.map(
    ({
      id,
      categories,
      payment_methods,
      recurring_rules,
      installment_plans,
      ...rest
    }) => ({
      ...rest
    })
  )

  const { data, error } = await supabase
    .from('account_items')
    .insert(sendData)
    .select()

  if (error) throw error
  return data
}
