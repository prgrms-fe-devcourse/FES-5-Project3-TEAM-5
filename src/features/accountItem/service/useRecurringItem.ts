import dayjs from 'dayjs'
import type { AccountItem } from '../model/types'

export const useRecurringItem = () => {
  const searchRecurringItem = (
    recurringItem: AccountItem,
    existingKey: Set<string>
  ) => {
    const endDate = dayjs(recurringItem.recurring_rules?.end_date)
    const frequency = recurringItem.recurring_rules?.frequency
    let date = dayjs(recurringItem.date)

    const newRecurringItem: AccountItem[] = []

    while (
      (date.isBefore(endDate) || date.isSame(endDate)) &&
      date.isBefore(dayjs())
    ) {
      const dateStr = date.format('YYYY-MM-DD')
      const key = `${recurringItem.id}-${dateStr}`

      if (!existingKey.has(key)) {
        newRecurringItem.push({
          ...recurringItem,
          date: dateStr,
          recurring_parent_id: recurringItem.id as string,
          recurring_rules: null
        })
      }

      if (frequency === 'daily') date = date.add(1, 'day')
      else if (frequency === 'weekly') date = date.add(1, 'week')
      else if (frequency === 'monthly') date = date.add(1, 'month')
      else if (frequency === 'yearly') date = date.add(1, 'year')
      else if (frequency === 'twoDays') date = date.add(2, 'day')
      else if (frequency === 'twoWeeks') date = date.add(2, 'week')
      else if (frequency === 'twoMonths') date = date.add(2, 'month')
      else if (frequency === 'twoYears') date = date.add(2, 'year')
      else break
    }

    return newRecurringItem
  }

  return { searchRecurringItem }
}
