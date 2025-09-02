import { useLoaderData, useNavigate, useParams } from 'react-router'
import type { AccountItem } from '@/features/accountItem'
import { formatPriceNumber } from '@/shared/utils/format'
import { PieChartItem } from '../../../features/statistics/ui/PieChartItem'
import {
  expenseColors,
  incomeColors
} from '../../../features/statistics/model/constant'
import { useSelectedDate } from '@/features/calendar'
import dayjs from 'dayjs'

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
        <div className="flex justify-between text-size-2xl font-bold">
          <p>{type === 'income' ? '수입' : '지출'} 카테고리</p>
          <p
            className={
              type === 'income' ? 'text-secondary-green' : 'text-secondary-red'
            }>
            {formatPriceNumber(
              categories.reduce((acc, curr) => acc + Number(curr.amount), 0)
            )}
          </p>
        </div>
        <div className="flex justify-center">
          <PieChartItem
            type={type as 'income' | 'expense'}
            data={categories}
          />
        </div>
        <div className="flex flex-col gap-2">
          {categories.map(category => (
            <div
              key={category.id}
              className="flex items-center gap-4">
              <div
                className={`w-4 h-4 rounded-full `}
                style={{
                  backgroundColor:
                    type === 'income'
                      ? (incomeColors.find(
                          v => v.title === (category.categories?.name ?? 'etc')
                        )?.color ?? '#cccccc')
                      : (expenseColors.find(
                          v => v.title === (category.categories?.name ?? 'etc')
                        )?.color ?? '#cccccc')
                }}
              />
              <div className="flex flex-col gap-0.5 text-size-lg">
                <p>{category.categories?.korean_name}</p>
                <p>
                  {formatPriceNumber(Number(category.amount))}원 (
                  {(
                    (Number(category.amount) /
                      categories.reduce(
                        (acc, curr) => acc + Number(curr.amount),
                        0
                      )) *
                    100
                  ).toFixed(1)}
                  %)
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
