import { useLoaderData, useNavigate, useParams } from 'react-router'

import dayjs from 'dayjs'

import type { AccountItem } from '@/features/accountItem'
import { useSelectedDate } from '@/features/calendar'
import { ChartContainer, ChartDetailsItem } from '@/features/statistics'

export function StatisticsDetailPage() {
  const { type } = useParams<{ type: 'income' | 'expense' }>()
  const navigate = useNavigate()
  const { events } = useLoaderData() as { events: AccountItem[] }
  const date = useSelectedDate(s => s.date)
  const startDate = dayjs(date).startOf('month').format('MM-DD')
  const endDate = dayjs(date).endOf('month').format('MM-DD')

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

  const categories = result.filter(event => event.type === type)

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="w-full min-h-[618px] px-5 py-2.5 flex flex-col gap-8 ">
      <div className="flex justify-between">
        <p className="text-size-xl font-bold">
          {startDate} ~ {endDate}
        </p>
        <button onClick={handleBack}>뒤로가기</button>
      </div>
      <div>
        <ChartContainer
          title={type === 'income' ? '수입' : '지출'}
          type={type as 'income' | 'expense'}
          data={categories}
        />
        <div className="flex flex-col gap-2">
          {categories.map(category => (
            <ChartDetailsItem
              key={category.id}
              type={type as 'income' | 'expense'}
              category={category}
              categories={categories}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
