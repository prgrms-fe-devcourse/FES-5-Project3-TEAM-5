import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import koLocale from '@fullcalendar/core/locales/ko'
import interactionPlugin, { type DateClickArg } from '@fullcalendar/interaction'

import { RenderEventContent } from '@/features/calendar/ui/calendar/RenderEventContent'
import { useEffect, useMemo, useRef } from 'react'
import { useSelectedDate } from '../../model/useSelectedDate'
import { useShallow } from 'zustand/shallow'
import type { CalendarEventType } from '../../model/type'

interface Props {
  setIsOpen: (isOpen: boolean) => void
  getCalendarByDate: (date: Date) => void
  calendarEvents: CalendarEventType[]
}

export const Calendar = ({
  setIsOpen,
  getCalendarByDate,
  calendarEvents
}: Props) => {
  const ref = useRef<FullCalendar>(null)

  const [date, setDate] = useSelectedDate(useShallow(s => [s.date, s.setDate]))

  const isSameDate = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()

  useEffect(() => {
    Promise.resolve().then(() => {
      ref.current?.getApi().gotoDate(date)
    })
  }, [date])

  const fcEvent = useMemo(
    () =>
      calendarEvents.map(e => ({
        title: e.amount,
        start: e.date,
        extendedProps: { type: e.type },
        backgroundColor: 'transparent',
        borderColor: 'transparent'
      })),
    [calendarEvents]
  )

  const handleDateClick = async (info: Date) => {
    setDate(info)
    await getCalendarByDate(info)
    setIsOpen(true)
  }

  return (
    <FullCalendar
      ref={ref}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      initialDate={date}
      locale={koLocale}
      events={fcEvent}
      height="auto"
      headerToolbar={false}
      eventContent={RenderEventContent}
      dateClick={arg => handleDateClick(arg.date)}
      dayCellClassNames={arg => {
        const base = [
          'ring-inset',
          'hover:ring-1',
          'hover:ring-primary-base',
          'hover:ring-offset-0',
          'rounded-md',
          'transition'
        ]
        if (date && isSameDate(arg.date, date)) base.push('bg-primary-light')
        return base
      }}
      dayCellContent={arg => ({ html: arg.dayNumberText.replace(/\D/g, '') })}
    />
  )
}
