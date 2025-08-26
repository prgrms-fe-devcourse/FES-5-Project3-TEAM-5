import { useEffect, useState } from 'react'
import { fetchCalendar, fetchCalendarByDate } from '../service/calendar'
import type { CalendarEventType } from './type'
import { useSelectedDate } from './useSelectedDate'

export const useCalendar = () => {
  const [calendarEvents, setCalendarEvents] = useState<CalendarEventType[]>([])
  const [calendarEventsByDate, setCalendarEventsByDate] = useState<
    CalendarEventType[]
  >([])
  const date = useSelectedDate(d => d.date)

  const getCalendar = async () => {
    const data = await fetchCalendar(date.getMonth())
    setCalendarEvents(data)
  }

  const getCalendarByDate = async (date: Date) => {
    const data = await fetchCalendarByDate(date)
    setCalendarEventsByDate(data)
  }

  useEffect(() => {
    getCalendar()
  }, [date])

  return {
    calendarEvents,
    calendarEventsByDate,
    getCalendar,
    getCalendarByDate
  }
}
