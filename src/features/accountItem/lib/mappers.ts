import type { AccountItem } from '../model/types'

export const mapDbToAccountItem = (row: AccountItem): AccountItem => ({
  id: String(row.id),
  amount: Number(row.amount),
  type: row.type,
  date: row.date,
  category_id: row.category_id,
  categories: row.categories,
  paymentMethod: row.paymentMethod,
  memo: row.memo,
  receipt: row.receipt
})
