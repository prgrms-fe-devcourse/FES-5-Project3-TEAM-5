import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import koLocale from '@fullcalendar/core/locales/ko'
import interactionPlugin, { type DateClickArg } from '@fullcalendar/interaction'
import type { CalendarEventType } from '@/features/calendar/model/type'
import { RenderEventContent } from '@/features/calendar/ui/calendar/RenderEventContent'
import { useEffect, useMemo, useRef, useState } from 'react'

interface Props {
  events: CalendarEventType[]
  currentDate: Date
}

export const Calendar = ({ events, currentDate }: Props) => {
  const ref = useRef<FullCalendar>(null)

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const isSameDate = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()

  useEffect(() => {
    ref.current?.getApi().gotoDate(currentDate)
  }, [currentDate])

  const fcEvent = useMemo(
    () =>
      events.map(e => ({
        title: e.amount,
        start: e.date,
        extendedProps: { type: e.type },
        backgroundColor: 'transparent',
        borderColor: 'transparent'
      })),
    [events]
  )

  const handleDateClick = (info: DateClickArg) => {
    setSelectedDate(info.date)
  }

  return (
    <FullCalendar
      ref={ref}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      initialDate={currentDate}
      locale={koLocale}
      events={fcEvent}
      height="auto"
      headerToolbar={false}
      eventContent={RenderEventContent}
      dateClick={info => handleDateClick(info)}
      dayCellClassNames={arg => {
        const base = [
          'ring-inset',
          'hover:ring-1',
          'hover:ring-primary-base',
          'hover:ring-offset-0',
          'rounded-md',
          'transition'
        ]
        if (isSameDate(arg.date, currentDate)) base.push('bg-primary-light')
        if (selectedDate && isSameDate(arg.date, selectedDate))
          base.push('bg-primary-light')
        return base
      }}
      dayCellContent={arg => ({ html: arg.dayNumberText.replace(/\D/g, '') })}
    />
  )
}
