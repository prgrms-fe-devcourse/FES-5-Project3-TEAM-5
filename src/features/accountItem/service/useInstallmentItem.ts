import dayjs from 'dayjs'
import type { AccountItem } from '../model/types'

export const useInstallmentItem = () => {
  const searchInstallmentItem = (
    installmentItem: AccountItem,
    existingKey: Set<string>
  ) => {
    const month = installmentItem.installment_plans?.months
    let date = dayjs(installmentItem.date)

    if (!month) return []
    const newInstallmentItem: AccountItem[] = []

    for (let i = 0; i < month; i++) {
      const dateStr = date.format('YYYY-MM-DD')
      const key = `${installmentItem.id}-${dateStr}`

      if (!existingKey.has(key)) {
        newInstallmentItem.push({
          ...installmentItem,
          date: dateStr,
          amount: installmentItem.amount,
          installment_parent_id: installmentItem.id as string,
          installment_plans: null
        })
      }
      date = date.add(1, 'month')
    }
    return newInstallmentItem
  }
  return { searchInstallmentItem }
}
