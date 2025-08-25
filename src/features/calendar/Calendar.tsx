import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import koLocale from '@fullcalendar/core/locales/ko'
import interactionPlugin from '@fullcalendar/interaction'
import { RenderEventContent } from './RenderEventContent'
import type { CalendarEventType } from './model/type'
import { useEffect, useRef } from 'react'

interface Props {
  events: CalendarEventType[]
  currentDate: Date
}

export const Calender = ({ events, currentDate }: Props) => {
  const ref = useRef<FullCalendar>(null)

  const isSameDate = (date: Date) => {
    return (
      date.getFullYear() === currentDate.getFullYear() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getDate() === currentDate.getDate()
    )
  }

  useEffect(() => {
    if (isSameDate(currentDate)) {
      ref.current?.getApi().gotoDate(currentDate)
    }
  }, [currentDate])

  const calendarEvents = events.map(e => ({
    title: e.amount,
    start: e.date,
    extendedProps: { type: e.type },
    backgroundColor: 'transparent',
    borderColor: 'transparent'
  }))
  return (
    <FullCalendar
      ref={ref}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      initialDate={currentDate}
      locale={koLocale}
      events={calendarEvents}
      height="auto"
      headerToolbar={false}
      eventContent={RenderEventContent}
      dayCellClassNames={arg => {
        const base = [
          'ring-inset',
          'hover:ring-1',
          'hover:ring-primary-base',
          'hover:ring-offset-0',
          'rounded-md',
          'transition'
        ]
        if (isSameDate(arg.date)) {
          base.push('bg-primary-light')
        }
        return base
      }}
      dayCellContent={arg => ({ html: arg.dayNumberText.replace(/\D/g, '') })}
    />
  )
}
