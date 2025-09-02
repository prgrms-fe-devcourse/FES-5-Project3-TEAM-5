import dayjs from 'dayjs'
import { fetchAllItems } from '../service/accountItem'

export const useExistingKey = () => {
  const fetchExistingKey = async (groupId: string) => {
    const all = await fetchAllItems(groupId)

    const existingRecurringKeys = new Set(
      all.map(i => {
        const parentKey = i.recurring_parent_id ?? i.id
        return `${parentKey}-${dayjs(i.date).format('YYYY-MM-DD')}`
      })
    )

    //할부 키
    const existingInstallmentKeys = new Set(
      all.map(i => {
        const parentKey = i.installment_parent_id ?? i.id
        return `${parentKey}-${dayjs(i.date).format('YYYY-MM-DD')}`
      })
    )

    // 반복 부모
    const recurringParents = all.filter(
      i => i.recurring_rules && !i.recurring_parent_id
    )

    // 할부 부모
    const installmentParents = all.filter(
      i => i.installment_plans && !i.installment_parent_id
    )

    return {
      existingRecurringKeys,
      existingInstallmentKeys,
      recurringParents,
      installmentParents
    }
  }

  return { fetchExistingKey }
}
