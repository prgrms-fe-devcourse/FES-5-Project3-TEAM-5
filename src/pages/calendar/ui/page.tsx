import { Calender } from './Calendar'
import { TotalReport } from './TotalReport'

const events = [
  { title: '점심 12,000원', date: '2025-08-23' },
  { title: '커피 4,500원', date: '2025-08-23' },
  { title: '월급 200만원', date: '2025-08-25' }
]

export default function CalendarPage() {
  return (
    <div>
      <TotalReport />
      <Calender events={events} />
    </div>
  )
}
