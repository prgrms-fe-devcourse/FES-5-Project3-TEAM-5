import { useState } from 'react'
import { fetchCalendarByDate } from '../service/calendar'
import type { CalendarEventType } from './type'

export const useCalendar = () => {
  const [calendarEventsByDate, setCalendarEventsByDate] = useState<
    CalendarEventType[]
  >([])

  const getCalendarByDate = async (date: Date) => {
    const data = await fetchCalendarByDate(date)
    setCalendarEventsByDate(data)
  }

  return {
    calendarEventsByDate,
    getCalendarByDate
  }
}
