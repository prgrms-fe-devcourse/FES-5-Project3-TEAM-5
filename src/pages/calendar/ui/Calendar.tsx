import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import koLocale from '@fullcalendar/core/locales/ko'
import interactionPlugin from '@fullcalendar/interaction'

interface Props {
  events: { title: string; date: string }[]
}

export const Calender = ({ events }: Props) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locale={koLocale}
      events={events}
      height="auto"
      headerToolbar={false}
    />
  )
}
