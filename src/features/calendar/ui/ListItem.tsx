import { ExpenseButton } from '@/shared/components/expenseButton/expenseButton'

interface Props {
  icon:
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
  title: string
}

export const ListItem = ({ icon, title }: Props) => {
  return (
    <div className="w-full border-b border-neutral-light p-2.5 flex justify-between">
      <div className="flex items-center gap-2.5 text-size-md">
        <div className="w-[30px] h-[30px] rounded-full bg-gray-50">
          <ExpenseButton
            size="md"
            icon={icon}
          />
        </div>
        <div>{title}</div>
      </div>
      <div>+123,234,123원</div>
    </div>
  )
}
