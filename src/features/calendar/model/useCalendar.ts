import { useEffect, useState } from 'react'
import { fetchCalendar } from '../service/calendar'
import type { CalendarEventType } from './type'
import { useSelectedDate } from './useSelectedDate'

export const useCalendar = () => {
  const [calendarEvents, setCalendarEvents] = useState<CalendarEventType[]>([])
  const date = useSelectedDate(d => d.date)

  const getCalendar = async () => {
    const data = await fetchCalendar(date.getMonth())
    setCalendarEvents(data)
  }

  useEffect(() => {
    getCalendar()
  }, [date])

  return { calendarEvents, setCalendarEvents }
}
