export type PaymentMethod = {
  id: string
  type: string
  index: number
}

export type Category = {
  id: string
  name: string
  korean_name: string
  type: 'income' | 'expense'
}