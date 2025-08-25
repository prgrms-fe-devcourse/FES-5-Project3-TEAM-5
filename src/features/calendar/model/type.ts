export type MoneyType = 'income' | 'expense'

export interface CalendarEventType {
  id: string
  amount: string
  type: MoneyType
  date: string
  paymentMethod?: string
  category?: string
  memo?: string
  receipt?: string
}
