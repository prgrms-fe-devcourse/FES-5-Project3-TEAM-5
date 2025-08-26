import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router'
import { TotalReport } from './TotalReport'
import {
  Calendar,
  PickDate,
  DateListOverlay,
  useSelectedDate,
  useCalendar
} from '@/features/calendar/index'
import type { AccountItem } from '@/features/accountItem/index'

interface LoaderData {
  events: AccountItem[]
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
