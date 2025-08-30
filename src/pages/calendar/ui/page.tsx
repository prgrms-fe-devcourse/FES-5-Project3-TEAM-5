import { useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router'
import { TotalReport } from './TotalReport'
import {
  Calendar,
  DateListOverlay,
  useSelectedDate
} from '@/features/calendar/index'
import type { AccountItem } from '@/features/accountItem/index'
import { useShallow } from 'zustand/shallow'
import dayjs from 'dayjs'
import { useRecurringItem } from '@/features/accountItem/service/useRecurringItem'

interface LoaderData {
  events: AccountItem[]
  initialDate: string
}

export const CalendarPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { initialDate, events } = useLoaderData() as LoaderData

  const { createRecurringItem } = useRecurringItem()

  const [calendarEventsByDate, setCalendarEventsByDate] = useState<
    AccountItem[]
  >([])

  const [setData, setAmountList] = useSelectedDate(
    useShallow(s => [s.setDate, s.setAmountList])
  )

  const navigate = useNavigate()

  useEffect(() => {
    events.forEach(recurringItem => {
      createRecurringItem(recurringItem)
    })
  }, [events])

  const calc = (events: AccountItem[]) =>
    events.reduce(
      (a, c) => {
        if (c.type === 'income') {
          a.income += Number(c.amount)
        } else {
          a.expense += Number(c.amount)
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

  const handleDateClick = async (info: Date) => {
    navigate(`/accountBook/calendar?date=${dayjs(info).format('YYYY-MM-DD')}`, {
      replace: true
    })

    setCalendarEventsByDate(
      events.filter(e => e.date === dayjs(info).format('YYYY-MM-DD'))
    )
    setIsOpen(true)
  }

  return (
    <div className="flex flex-col gap-2 items-center h-full">
      <TotalReport />
      <div className="relative ">
        <Calendar
          calendarEvents={events}
          handleDateClick={handleDateClick}
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
