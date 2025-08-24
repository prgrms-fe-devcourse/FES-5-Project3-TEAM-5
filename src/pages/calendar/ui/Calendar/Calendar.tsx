import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import koLocale from '@fullcalendar/core/locales/ko'
import interactionPlugin from '@fullcalendar/interaction'
import { RenderEventContent } from './renderEventContent'
import type { CalendarEventType } from '../../model/type'

interface Props {
  events: CalendarEventType[]
}

export const Calender = ({ events }: Props) => {
  const calendarEvents = events.map(e => ({
    title: e.amount,
    start: e.date,
    extendedProps: { type: e.type },
    backgroundColor: 'transparent',
    borderColor: 'transparent'
  }))
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locale={koLocale}
      events={calendarEvents}
      height="auto"
      headerToolbar={false}
      eventContent={RenderEventContent}
      dayCellClassNames={() => [
        'ring-inset',
        'hover:ring-1',
        'hover:ring-primary-base',
        'hover:ring-offset-0',
        'rounded-md',
        'transition'
      ]}
      dayCellContent={arg => ({ html: arg.dayNumberText.replace(/\D/g, '') })}
    />
  )
}
