import type { AccountItem } from '../model/types'

export const mapDbToAccountItem = (row: AccountItem): AccountItem => ({
  id: String(row.id),
  amount: Number(row.amount),
  type: row.type,
  date: row.date,
  category: row.category,
  paymentMethod: row.paymentMethod,
  memo: row.memo,
  receipt: row.receipt
})
