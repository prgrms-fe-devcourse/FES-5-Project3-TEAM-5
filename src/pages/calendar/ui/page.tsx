import { TotalReport } from './TotalReport'
import type { CalendarEventType } from '../../../features/calendar/model/type'
import { useState } from 'react'
import { Calendar, PickDate, DateListOverlay } from '../../../features/calendar'

const events: CalendarEventType[] = [
  { id: '1', date: '2025-08-23', type: 'income', amount: '12000' },
  { id: '2', date: '2025-08-23', type: 'expense', amount: '4500' },
  { id: '3', date: '2025-08-25', type: 'income', amount: '10000000' },
  { id: '4', date: '2025-07-10', type: 'expense', amount: '10000000' }
]

export const CalendarPage = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col gap-2 items-center h-full">
      <PickDate />
      <TotalReport />
      <div className="relative ">
        <Calendar events={events} />
        <DateListOverlay
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <button onClick={() => setIsOpen(true)}>open</button>
      </div>
    </div>
  )
}
