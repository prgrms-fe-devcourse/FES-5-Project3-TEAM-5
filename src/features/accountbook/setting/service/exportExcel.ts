import supabase from '@/supabase/supabase'

export async function getExcelData({
  groupId,
  startDate,
  endDate
}: {
  groupId: string
  startDate: string
  endDate: string
}) {
  const { data, error } = await supabase
    .from('account_items')
    .select(
      ` *,
          category_id, recurring_rule_id, payment_method_id, installment_plan_id,
          categories:categories!account_items_category_id_fkey(name, korean_name),
          recurring_rules:recurring_rules!account_items_recurring_rule_id_fkey(frequency, end_date),
          payment_methods:payment_methods!account_items_payment_method_id_fkey(type),
          installment_plans:installment_plans!account_items_installment_plan_id_fkey(months, start_date, end_date),
          users:users!account_items_user_id_fkey(id, nickname),
          reactions:reactions!reactions_item_id_fkey(id, kind,user_id)
        `
    )
    .eq('group_id', groupId)
    .gte('date', startDate) // created_at → date로 변경
    .lte('date', endDate) // lt → lte로 변경 (마지막 날도 포함)

  if (error) throw error
  return data
}
