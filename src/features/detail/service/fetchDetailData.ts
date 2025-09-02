import supabase from '@/supabase/supabase'

export async function getDetailItemData(itemId: string) {
  const { data, error } = await supabase
    .from('account_items')
    .select(
      `
        *,
        category_id, recurring_rule_id, payment_method_id, installment_plan_id,
        categories:categories!account_items_category_id_fkey(name, korean_name),
        recurring_rules:recurring_rules!account_items_recurring_rule_id_fkey(frequency, end_date),
        payment_methods:payment_methods!account_items_payment_method_id_fkey(type),
        installment_plans:installment_plans!account_items_installment_plan_id_fkey(months, start_date, end_date),
        users:users!account_items_user_id_fkey(id, nickname),
        reactions:reactions!reactions_item_id_fkey(id, kind)
      `
    )
    .eq('id', itemId)

  if (error) throw error

  return data
}

export async function getCommentsData(itemId: string) {
  const { data, error } = await supabase
    .from('comments')
    .select('*,    users:users!comments_user_id_fkey(id, nickname)')
    .eq('item_id', itemId)
  if (error) throw error

  return data
}
