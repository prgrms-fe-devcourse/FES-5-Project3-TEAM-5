import type { AccountItem } from '@/features/accountItem'
import { formatPriceNumber } from '@/shared/utils/format'
import { PieChartItem } from '../ui/PieChartItem'

interface Props {
  title: string
  type: 'income' | 'expense'
  data: AccountItem[]
  onClick?: () => void
}

export const ChartContainer = ({ title, type, data, onClick }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between text-size-2xl font-bold">
        <p>{title}</p>
        <p
          className={
            type === 'income' ? 'text-secondary-green' : 'text-secondary-red'
          }>
          {formatPriceNumber(
            data.reduce((acc, curr) => acc + Number(curr.amount), 0)
          )}
        </p>
      </div>
      <div>
        <div className="flex justify-center">
          <PieChartItem
            type={type}
            data={data}
          />
        </div>
        {onClick && (
          <div
            className="cursor-pointer hover:underline flex justify-end"
            onClick={onClick}>
            자세히 보기
          </div>
        )}
      </div>
    </div>
  )
}
