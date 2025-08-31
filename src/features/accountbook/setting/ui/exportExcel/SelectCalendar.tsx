import { useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

function SelectCalendar() {
  const calendarRef = useRef<FullCalendar>(null)

  const handlePrev = () => {
    const calendarApi = calendarRef.current?.getApi()
    calendarApi?.prev()
  }

  const handleNext = () => {
    const calendarApi = calendarRef.current?.getApi()
    calendarApi?.next()
  }

  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      locale="ko"
      height="auto"
      customButtons={{
        myPrev: { text: '◀', click: handlePrev },
        myNext: { text: '▶', click: handleNext }
      }}
      headerToolbar={{
        left: 'myPrev',
        center: 'title',
        right: 'myNext'
      }}
      dayCellContent={arg => (
        <div className="text-sm text-neutral-dark font-normal ">
          {arg.date.getDate()}
        </div>
      )}
      dayHeaderClassNames={() => 'text-sm text-neutral-dark font-normal'}
    />
  )
}

export default SelectCalendar
