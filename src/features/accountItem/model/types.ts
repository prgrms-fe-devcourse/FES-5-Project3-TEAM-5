export type MoneyType = 'income' | 'expense'

export interface AccountItem {
  id: string
  amount: number
  type: MoneyType
  date: string
  paymentMethod?: string
  category?: string
  memo?: string
  receipt?: string
}
