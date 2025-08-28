import { useSelectedDate } from '@/features/calendar'
import { PieChartItem } from './PieChartItem'

import dayjs from 'dayjs'
import { useLoaderData, useNavigate } from 'react-router'
import type { AccountItem } from '@/features/accountItem'
import { formatPriceNumber } from '@/shared/utils/format'

export default function StatisticsPage() {
  const date = useSelectedDate(s => s.date)
  const startDate = dayjs(date).startOf('month').format('MM-DD')
  const endDate = dayjs(date).endOf('month').format('MM-DD')
  const navigate = useNavigate()

  const { events } = useLoaderData() as { events: AccountItem[] }

  const incomeCategories = events.filter(event => event.type === 'income')
  const expenseCategories = events.filter(event => event.type === 'expense')

  const handleDetail = (type: 'income' | 'expense') => {
    navigate(`/accountBook/statistics/detail/${type}`)
  }

  return (
    <div className="w-full min-h-[618px] px-5 py-2.5 flex flex-col gap-8">
      <p className="text-size-xl font-bold">
        {startDate} ~ {endDate}
      </p>
      <div>
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
        <div className="flex justify-center">
          <PieChartItem
            type="income"
            data={incomeCategories}
            onClick={() => handleDetail('income')}
          />
        </div>
      </div>

      <div>
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
        <div className="flex justify-center">
          <PieChartItem
            type="expense"
            data={expenseCategories}
            onClick={() => handleDetail('expense')}
          />
        </div>
      </div>
    </div>
  )
}
