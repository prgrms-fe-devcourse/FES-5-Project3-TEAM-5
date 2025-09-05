import dayjs from 'dayjs'
import { useLoaderData, useNavigate } from 'react-router'
import type { AccountItem } from '@/features/accountItem'
import { useSelectedDate } from '@/features/calendar'

import { useStorageGroup } from '@/features/group/model/useStorageGroup'
import { ChartContainer } from '@/features/statistics'

export function StatisticsPage() {
  const date = useSelectedDate(s => s.date)
  const startDate = dayjs(date).startOf('month').format('MM-DD')
  const endDate = dayjs(date).endOf('month').format('MM-DD')
  const navigate = useNavigate()
  const getStorageGroup = useStorageGroup(s => s.getStorageGroup)

  const { events } = useLoaderData() as { events: AccountItem[] }

  const handleDetail = (type: 'income' | 'expense') => {
    navigate(`/accountBook/${getStorageGroup()}/statistics/detail/${type}`)
  }

  const result = Object.values(
    events.reduce<Record<string, AccountItem>>((acc, event) => {
      const name = event.categories?.name ?? '기타'
      const amount = Number(event.amount)

      if (acc[name]) {
        acc[name].amount = Number(acc[name].amount) + amount
      } else {
        acc[name] = { ...event, amount }
      }
      return acc
    }, {})
  )

  const incomeCategories = result.filter(event => event.type === 'income')
  const expenseCategories = result.filter(event => event.type === 'expense')

  return (
    <div className="w-full min-h-[618px] px-4 py-2.5 flex flex-col gap-8">
      <p className="text-size-xl font-bold">
        {startDate} ~ {endDate}
      </p>
      <ChartContainer
        title="수입 카테고리"
        type="income"
        data={incomeCategories}
        onClick={() => handleDetail('income')}
      />
      <ChartContainer
        title="지출 카테고리"
        type="expense"
        data={expenseCategories}
        onClick={() => handleDetail('expense')}
      />
    </div>
  )
}
