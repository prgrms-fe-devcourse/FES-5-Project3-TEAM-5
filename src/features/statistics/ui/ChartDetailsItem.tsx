import type { AccountItem } from '@/features/accountItem'
import { expenseColors, incomeColors } from '../model/constant'
import { formatPriceNumber } from '@/shared/utils/format'

interface Props {
  type: 'income' | 'expense'
  category: AccountItem
  categories: AccountItem[]
}

export const ChartDetailsItem = ({ type, category, categories }: Props) => {
  return (
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
              categories.reduce((acc, curr) => acc + Number(curr.amount), 0)) *
            100
          ).toFixed(1)}
          %)
        </p>
      </div>
    </div>
  )
}
