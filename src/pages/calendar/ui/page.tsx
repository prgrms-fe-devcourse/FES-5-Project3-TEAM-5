import { useEffect, useMemo, useState } from 'react'
import { useLoaderData } from 'react-router'
import { TotalReport } from './TotalReport'
import {
  Calendar,
  PickDate,
  DateListOverlay,
  useSelectedDate,
  useCalendar
} from '@/features/calendar/index'
import type { AccountItem } from '@/features/accountItem/index'
import { useShallow } from 'zustand/shallow'

interface LoaderData {
  events: AccountItem[]
  initialDate: string
}

export const CalendarPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { initialDate, events } = useLoaderData() as LoaderData

  const [setData, setAmountList] = useSelectedDate(
    useShallow(s => [s.setDate, s.setAmountList])
  )

  const { calendarEventsByDate, getCalendarByDate } = useCalendar()

  const calc = (events: AccountItem[]) =>
    events.reduce(
      (a, c) => {
        if (c.type === 'income') {
          a.income += c.amount
        } else {
          a.expense += c.amount
        }
        a.balance = a.income - a.expense
        return a
      },
      { income: 0, expense: 0, balance: 0 }
    )

  useEffect(() => {
    setData(new Date(initialDate))
    setAmountList(calc(events))
  }, [initialDate, setData, setAmountList, events])

  return (
    <div className="flex flex-col gap-2 items-center h-full">
      <PickDate />
      <TotalReport />
      <div className="relative ">
        <Calendar
          setIsOpen={setIsOpen}
          calendarEvents={events}
          getCalendarByDate={getCalendarByDate}
        />
        <DateListOverlay
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          events={calendarEventsByDate}
        />
      </div>
    </div>
  )
}
