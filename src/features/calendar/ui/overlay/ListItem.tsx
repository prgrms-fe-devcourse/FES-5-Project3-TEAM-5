import { ExpenseButton } from '@/shared/components/expenseButton/expenseButton'
import { formatPriceNumber } from '@/shared/utils/format'
import { tw } from '@/shared/utils/tw'

export type IconType =
  | 'beauty'
  | 'cafe'
  | 'clothes'
  | 'cultural'
  | 'dailyNecessities'
  | 'dwelling'
  | 'education'
  | 'etc'
  | 'events'
  | 'food'
  | 'insurance'
  | 'medical'
  | 'phone'
  | 'savings'
  | 'transport'
interface Props {
  icon: IconType
  title: string
  amount: number
  type: 'income' | 'expense'
}

export const ListItem = ({ icon, title, amount, type }: Props) => {
  return (
    <div className="w-full border-b border-neutral-light p-2.5 flex justify-between items-center">
      <div className="flex items-center gap-2.5 text-size-md">
        <div className="w-[30px] h-[30px] rounded-full bg-gray-50">
          <ExpenseButton
            size="md"
            icon={icon}
          />
        </div>
        <div>{title}</div>
      </div>
      <div
        className={tw(
          type === 'income' ? 'text-secondary-blue' : 'text-secondary-red'
        )}>
        {type === 'income' ? '+' : '-'} {formatPriceNumber(amount)} 원
      </div>
    </div>
  )
}
