import { formatPriceNumber } from '@/shared/utils/format'
import { useSelectedDate } from '../../model/useSelectedDate'
import incomeSvg from '../svg/income.svg'
import expenseSvg from '../svg/expense.svg'

interface Props {
  income: number
  expense: number
}

export const ListHeader = ({ income, expense }: Props) => {
  const date = useSelectedDate(s => s.date)
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']

  return (
    <div className="w-full p-3 flex justify-between items-center text-size-md border-b border-neutral-base">
      <div className="w-[52px] flex flex-col items-center gap-1 text-size-sm">
        <div className="text-size-xl">{date.getDate()}</div>
        <div className="px-2.5 py-0.5 bg-neutral-light rounded-lg">{days[date.getDay()]}</div>
      </div>
      <div className="flex gap-6 items-center">
        <div className="flex items-center gap-1">
          <img
            src={incomeSvg}
            alt="income"
          />
          <div>{formatPriceNumber(income)}원</div>
        </div>
        <div className="flex items-center gap-1">
          <img
            src={expenseSvg}
            alt="expense"
          />
          <div>{formatPriceNumber(expense)}원</div>
        </div>
      </div>
    </div>
  )
}
