import { Calender } from './Calendar/Calendar'
import { TotalReport } from './TotalReport'
import type { CalendarEventType } from '../model/type'

const events: CalendarEventType[] = [
  { id: '1', date: '2025-08-23', type: 'income', amount: '12000' },
  { id: '2', date: '2025-08-23', type: 'expense', amount: '4500' },
  { id: '3', date: '2025-08-25', type: 'income', amount: '10000000' }
]

export default function CalendarPage() {
  return (
    <div className="flex flex-col gap-2">
      <TotalReport />
      <Calender events={events} />
    </div>
  )
}
