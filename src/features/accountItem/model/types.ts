export type MoneyType = 'income' | 'expense'

export interface AccountItem {
  id: string | number
  amount: number | string
  type: MoneyType
  date: string
  memo?: string | null

  category_id?: string | null
  recurring_rule_id?: string | null
  payment_method_id?: string | null
  installment_plan_id?: string | null

  // 조인된 관계들 (테이블 명 기준 키)
  categories?: { name: string } | null
  recurring_rules?: { frequency: string; end_date: string } | null
  payment_methods?: { type: string } | null
  installment_plans?: {
    months: number
    start_date: string
    end_date: string
  } | null
}
