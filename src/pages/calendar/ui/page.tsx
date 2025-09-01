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
import {
  createRecurringItem,
  fetchAllItems
} from '@/features/accountItem/service/accountItem'
import AddButton from '@/shared/components/buttons/AddButton'
import { useInstallmentItem } from '@/features/accountItem/service/useInstallmentItem'

interface LoaderData {
  events: AccountItem[]
  initialDate: string
}

export const CalendarPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { initialDate, events } = useLoaderData() as LoaderData

  const { searchRecurringItem } = useRecurringItem()
  const { searchInstallmentItem } = useInstallmentItem()

  const [calendarEventsByDate, setCalendarEventsByDate] = useState<
    AccountItem[]
  >([])

  const [setData, setAmountList] = useSelectedDate(
    useShallow(s => [s.setDate, s.setAmountList])
  )

  const navigate = useNavigate()

  useEffect(() => {
    const run = async () => {
      const all = await fetchAllItems()

      // 반복 키
      const existingRecurringKeys = new Set(
        all.map(i => {
          const parentKey = i.recurring_parent_id ?? i.id
          return `${parentKey}-${dayjs(i.date).format('YYYY-MM-DD')}`
        })
      )

      //할부 키
      const existingInstallmentKeys = new Set(
        all.map(i => {
          const parentKey = i.installment_parent_id ?? i.id
          return `${parentKey}-${dayjs(i.date).format('YYYY-MM-DD')}`
        })
      )

      // 반복 부모
      const recurringParents = all.filter(
        i => i.recurring_rules && !i.recurring_parent_id
      )

      // 할부 부모
      const installmentParents = all.filter(
        i => i.installment_plans && !i.installment_parent_id
      )

      const toCreate: AccountItem[] = []

      // 반복
      for (const parent of recurringParents) {
        const generated = searchRecurringItem(parent, existingRecurringKeys)
        if (generated.length) toCreate.push(...generated)
      }

      // 할부
      for (const installment of installmentParents) {
        const generated = searchInstallmentItem(
          installment,
          existingInstallmentKeys
        )
        if (generated.length) toCreate.push(...generated)
      }

      if (toCreate.length) {
        await createRecurringItem(toCreate)
      }
    }
    run()
  }, [])

  console.log(events)
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
      <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[1001]">
        <div className="relative mx-auto w-full max-w-[420px] px-4">
          <div className="pointer-events-auto absolute right-3 bottom-0">
            <AddButton onClick={() => navigate('/accountBook/item/add')} />
          </div>
        </div>
      </div>
    </div>
  )
}
