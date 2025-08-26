import { TotalReport } from './TotalReport'
import { useState } from 'react'
import { Calendar, PickDate, DateListOverlay } from '../../../features/calendar'
import { useCalendar } from '@/features/calendar/model/useCalendar'

export const CalendarPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { calendarEvents, calendarEventsByDate, getCalendarByDate } =
    useCalendar()

  return (
    <div className="flex flex-col gap-2 items-center h-full">
      <PickDate />
      <TotalReport />
      <div className="relative ">
        <Calendar
          setIsOpen={setIsOpen}
          calendarEvents={calendarEvents}
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
