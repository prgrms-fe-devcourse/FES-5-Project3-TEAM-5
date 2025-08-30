import dayjs from 'dayjs'
import type { AccountItem } from '../model/types'

export const useRecurringItem = () => {
  const createRecurringItem = (recurringItem: AccountItem) => {
    const endDate = dayjs(recurringItem.recurring_rules?.end_date)
    const frequency = recurringItem.recurring_rules?.frequency
    let date = dayjs(recurringItem.date)

    const newRecurringItem: AccountItem[] = []

    while (
      (date.isBefore(endDate) || date.isSame(endDate)) &&
      date.isBefore(dayjs())
    ) {
      newRecurringItem.push({
        ...recurringItem,
        date: date.format('YYYY-MM-DD'),
        recurring_parent_id: recurringItem.id as string,
        recurring_rules: null
      })
      if (frequency === 'daily') {
        date = date.add(1, 'day')
      } else if (frequency === 'weekly') {
        date = date.add(1, 'week')
      } else if (frequency === 'monthly') {
        date = date.add(1, 'month')
      } else {
        break
      }
    }
    console.log(newRecurringItem)
  }

  return { createRecurringItem }
}
