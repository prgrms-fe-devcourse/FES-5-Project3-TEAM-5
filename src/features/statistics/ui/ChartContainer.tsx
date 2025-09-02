import type { AccountItem } from '@/features/accountItem'
import { formatPriceNumber } from '@/shared/utils/format'
import { PieChartItem } from '../ui/PieChartItem'
import { Link } from 'react-router'
import { Button } from '@/shared/components/shadcn/ui/button'

interface Props {
  title: string
  type: 'income' | 'expense'
  data: AccountItem[]
  onClick?: () => void
}

export const ChartContainer = ({ title, type, data, onClick }: Props) => {
  const total = data.reduce((acc, curr) => acc + Number(curr.amount), 0)
  const isEmpty = data.length === 0 || total === 0
  const storageGroup = localStorage.getItem('storageGroup') || ''

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between text-size-2xl font-bold">
        <p>{title}</p>
        <p
          className={
            type === 'income' ? 'text-secondary-green' : 'text-secondary-red'
          }>
          {formatPriceNumber(total)}
        </p>
      </div>
      <div>
        {isEmpty ? (
          <div className="h-[300px] grid place-items-center rounded-xl border border-gray-200 bg-gray-50 text-gray-500">
            <div className="flex flex-col items-center gap-3">
              <span>이번 달 데이터가 없어요.</span>
              {storageGroup && (
                <Button
                  asChild
                  variant="outline"
                  size="sm">
                  <Link to={`/accountBook/${storageGroup}/item/add`}>
                    항목 추가하기
                  </Link>
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <PieChartItem
              type={type}
              data={data}
            />
          </div>
        )}
        {!isEmpty && onClick && (
          <div className="flex justify-end">
            <Button
              variant="link"
              size="sm"
              onClick={onClick}>
              자세히 보기
              <svg
                className="size-4"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 5L12 10L7 15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
