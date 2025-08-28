import { useLoaderData, useNavigate, useParams } from 'react-router'
import type { AccountItem } from '@/features/accountItem'
import { formatPriceNumber } from '@/shared/utils/format'
import { PieChartItem } from './PieChartItem'
import { expenseColors, incomeColors } from './constant'

export default function StatisticsDetailPage() {
  const { type } = useParams<{ type: 'income' | 'expense' }>()
  const navigate = useNavigate()
  const { events } = useLoaderData() as { events: AccountItem[] }

  const categories = events.filter(event => event.type === type)

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="w-full min-h-[618px] px-5 py-2.5 flex flex-col gap-8 ">
      <button onClick={handleBack}>뒤로가기</button>
      <div>
        <p className="text-size-lg font-bold">카테고리별 지출</p>
        <div className="flex justify-between text-size-2xl font-bold">
          <p>{type === 'income' ? '수입' : '지출'} 카테고리</p>
          <p
            className={
              type === 'income' ? 'text-secondary-blue' : 'text-secondary-red'
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
