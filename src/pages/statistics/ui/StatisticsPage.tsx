import { useSelectedDate } from '@/features/calendar'
import { PieChartItem } from '../../../features/statistics/ui/PieChartItem'

import dayjs from 'dayjs'
import { useLoaderData, useNavigate } from 'react-router'
import type { AccountItem } from '@/features/accountItem'
import { formatPriceNumber } from '@/shared/utils/format'

export function StatisticsPage() {
  const date = useSelectedDate(s => s.date)
  const startDate = dayjs(date).startOf('month').format('MM-DD')
  const endDate = dayjs(date).endOf('month').format('MM-DD')
  const navigate = useNavigate()

  const { events } = useLoaderData() as { events: AccountItem[] }

  const handleDetail = (type: 'income' | 'expense') => {
    navigate(`/accountBook/statistics/detail/${type}`)
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
    <div className="w-full min-h-[618px] px-5 py-2.5 flex flex-col gap-8">
      <p className="text-size-xl font-bold">
        {startDate} ~ {endDate}
      </p>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between text-size-2xl font-bold">
          <p>수입 카테고리</p>
          <p className="text-secondary-green">
            {formatPriceNumber(
              incomeCategories.reduce(
                (acc, curr) => acc + Number(curr.amount),
                0
              )
            )}
          </p>
        </div>
        <div>
          <div className="flex justify-center">
            <PieChartItem
              type="income"
              data={incomeCategories}
            />
          </div>
          <div
            className="cursor-pointer hover:underline flex justify-end"
            onClick={() => handleDetail('income')}>
            자세히 보기
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between text-size-2xl font-bold">
            <p>지출 카테고리</p>
            <p className="text-secondary-red">
              {formatPriceNumber(
                expenseCategories.reduce(
                  (acc, curr) => acc + Number(curr.amount),
                  0
                )
              )}
            </p>
          </div>
          <div>
            <div className="flex justify-center">
              <PieChartItem
                type="expense"
                data={expenseCategories}
              />
            </div>
            <div
              className="cursor-pointer hover:underline flex justify-end"
              onClick={() => handleDetail('expense')}>
              자세히 보기
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
