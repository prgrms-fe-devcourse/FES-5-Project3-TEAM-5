import { useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router'

import dayjs from 'dayjs'
import { useShallow } from 'zustand/shallow'

import { TotalReport } from './TotalReport'

import {
  Calendar,
  DateListOverlay,
  useSelectedDate
} from '@/features/calendar/index'

import {
  useRecurringItem,
  useInstallmentItem,
  useExistingKey,
  type AccountItem,
  createRecurringItem
} from '@/features/accountItem/index'

import { useStorageGroup } from '@/features/group/model/useStorageGroup'

import AddButton from '@/shared/components/buttons/AddButton'

interface LoaderData {
  events: AccountItem[]
  initialDate: string
}

export const CalendarPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [calendarEventsByDate, setCalendarEventsByDate] = useState<
    AccountItem[]
  >([])

  const { initialDate, events } = useLoaderData() as LoaderData

  const { searchRecurringItem } = useRecurringItem()
  const { searchInstallmentItem } = useInstallmentItem()

  const getStorageGroup = useStorageGroup(state => state.getStorageGroup)
  const storageGroup = getStorageGroup()

  const { fetchExistingKey } = useExistingKey()

  const [setData, setAmountList] = useSelectedDate(
    useShallow(s => [s.setDate, s.setAmountList])
  )

  const navigate = useNavigate()

  useEffect(() => {
    const run = async () => {
      if (!storageGroup) return

      const {
        recurringParents,
        installmentParents,
        existingRecurringKeys,
        existingInstallmentKeys
      } = await fetchExistingKey(storageGroup)

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
        // 새로운 항목이 생성되었으면 페이지 새로고침
        window.location.reload()
      }
    }
    run()
  }, [storageGroup, initialDate])

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
    navigate(
      `/accountBook/${storageGroup}/calendar?date=${dayjs(info).format('YYYY-MM-DD')}`,
      {
        replace: true
      }
    )

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
          groupId={storageGroup}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          events={calendarEventsByDate}
        />
      </div>
      <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[1001]">
        <div className="relative mx-auto w-full max-w-[420px] px-4">
          <div className="pointer-events-auto absolute right-3 bottom-0">
            <AddButton
              onClick={() => navigate(`/accountBook/${storageGroup}/item/add`)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
