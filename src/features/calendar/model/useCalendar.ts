import { useState } from 'react'
import { fetchByDate } from '@/features/accountItem/index'
import type { AccountItem } from '@/features/accountItem/index'

export const useCalendar = () => {
  const [calendarEventsByDate, setCalendarEventsByDate] = useState<
    AccountItem[]
  >([])

  const getCalendarByDate = async (date: Date) => {
    const data = await fetchByDate(date)
    setCalendarEventsByDate(data)
  }

  return {
    calendarEventsByDate,
    getCalendarByDate
  }
}
