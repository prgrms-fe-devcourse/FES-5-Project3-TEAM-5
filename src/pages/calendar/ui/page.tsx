import { Calender } from './Calendar/Calendar'
import { TotalReport } from './TotalReport'
import type { CalendarEventType } from '../model/type'
import { PickDate } from './PickDate'
import { useState } from 'react'

const events: CalendarEventType[] = [
  { id: '1', date: '2025-08-23', type: 'income', amount: '12000' },
  { id: '2', date: '2025-08-23', type: 'expense', amount: '4500' },
  { id: '3', date: '2025-08-25', type: 'income', amount: '10000000' },
  { id: '4', date: '2025-07-10', type: 'expense', amount: '10000000' }
]

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col gap-2 items-center">
      <PickDate
        value={date || new Date()}
        onChange={d => d && setDate(d)}
      />

      <TotalReport />
      <Calender
        events={events}
        currentDate={date as Date}
      />
    </div>
  )
}
