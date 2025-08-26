import { TotalReport } from './TotalReport'
import { useState } from 'react'
import { Calendar, PickDate, DateListOverlay } from '../../../features/calendar'

export const CalendarPage = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col gap-2 items-center h-full">
      <PickDate />
      <TotalReport />
      <div className="relative ">
        <Calendar />
        <DateListOverlay
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <button onClick={() => setIsOpen(true)}>open</button>
      </div>
    </div>
  )
}
