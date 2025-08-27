import supabase from '@/supabase/supabase'

import dayjs from 'dayjs'

// 캘린더 월 데이터 조회
export const fetchByMonth = async (month: number) => {
  const startDate = dayjs().month(month).startOf('month').format('YYYY-MM-DD')
  const endDate = dayjs().month(month).endOf('month').format('YYYY-MM-DD')

  const { data, error } = await supabase
    .from('account_items')
    .select(
      `
      id, amount, type, date, memo,
      category_id, recurring_rule_id, payment_method_id, installment_plan_id,
      categories(name),
      recurring_rules(frequency, end_date),
      payment_methods(type),
      installment_plans(months, start_date, end_date)
    `
    )
    .gte('date', startDate)
    .lte('date', endDate)

  if (error) throw error
  return data
}
