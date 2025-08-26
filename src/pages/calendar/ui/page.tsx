import { TotalReport } from './TotalReport'
import { useEffect, useState } from 'react'
import { Calendar, PickDate, DateListOverlay } from '../../../features/calendar'
import { useLoaderData } from 'react-router'
import type { CalendarEventType } from '@/features/calendar/model/type'
import { useSelectedDate } from '@/features/calendar/model/useSelectedDate'
import { useCalendar } from '@/features/calendar/model/useCalendar'

interface LoaderData {
  events: CalendarEventType[]
  initialDate: string
}

export const CalendarPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { initialDate, events } = useLoaderData() as LoaderData

  const setData = useSelectedDate(s => s.setDate)
  const { calendarEventsByDate, getCalendarByDate } = useCalendar()

  useEffect(() => {
    setData(new Date(initialDate))
  }, [initialDate, setData])

  return (
    <div className="flex flex-col gap-2 items-center h-full">
      <PickDate />
      <TotalReport />
      <div className="relative ">
        <Calendar
          setIsOpen={setIsOpen}
          calendarEvents={events}
          getCalendarByDate={getCalendarByDate}
        />
        <DateListOverlay
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          events={calendarEventsByDate}
        />
      </div>
    </div>
  )
}
