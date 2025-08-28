import { useSelectedDate } from '@/features/calendar'
import { PieChartItem } from './PieChartItem'

import dayjs from 'dayjs'
import { useLoaderData } from 'react-router'
import type { AccountItem } from '@/features/accountItem'

export default function StatisticsPage() {
  const date = useSelectedDate(s => s.date)
  const startDate = dayjs(date).startOf('month').format('MM-DD')
  const endDate = dayjs(date).endOf('month').format('MM-DD')

  const { events } = useLoaderData() as { events: AccountItem[] }

  const incomeCategories = events.filter(event => event.type === 'income')
  const expenseCategories = events.filter(event => event.type === 'expense')

  return (
    <div className="w-full min-h-[618px] px-5 py-2.5 flex flex-col gap-8 justify-center items-center">
      <p className="text-size-xl font-bold">
        {startDate} ~ {endDate}
      </p>
      <div>
        <div className="flex justify-between text-size-lg font-bold">
          <p>수입 카테고리</p>
          <p className="text-secondary-blue">111.111.111</p>
        </div>
        <PieChartItem
          type="income"
          data={incomeCategories}
        />
      </div>

      <div>
        <div className="flex justify-between text-size-lg font-bold">
          <p>지출 카테고리</p>
          <p className="text-secondary-red">111.111.111</p>
        </div>
        <PieChartItem
          type="expense"
          data={expenseCategories}
        />
      </div>
    </div>
  )
}
