export type MoneyType = 'income' | 'expense'

export interface AccountItem {
  id: string | number
  group_id: string | number
  user_id: string | number
  type: MoneyType
  amount: number | string
  date: string

  category_id?: string | null
  payment_method_id?: string | null
  installment_plan_id?: string | null
  recurring_rule_id?: string | null

  memo?: string | null
  receipt_url?: string | null
  recurring_parent_id?: string | null

  // 조인된 관계들 (테이블 명 기준 키)
  categories?: { name: string; korean_name: string } | null
  recurring_rules?: { frequency: string; end_date: string } | null
  payment_methods?: { type: string } | null
  installment_plans?: {
    months: number
    start_date: string
    end_date: string
  } | null
}
