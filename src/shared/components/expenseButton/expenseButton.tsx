import { tw } from '@/shared/utils/tw'

import beauty from '@/shared/assets/expenseIcon/beauty.svg'
import cafe from '@/shared/assets/expenseIcon/cafe.svg'
import clothes from '@/shared/assets/expenseIcon/clothes.svg'
import cultural from '@/shared/assets/expenseIcon/cultural.svg'
import dailyNecessities from '@/shared/assets/expenseIcon/dailyNecessities.svg'
import dwelling from '@/shared/assets/expenseIcon/dwelling.svg'
import education from '@/shared/assets/expenseIcon/education.svg'
import etc from '@/shared/assets/expenseIcon/etc.svg'
import events from '@/shared/assets/expenseIcon/events.svg'
import food from '@/shared/assets/expenseIcon/food.svg'
import insurance from '@/shared/assets/expenseIcon/insurance.svg'
import medical from '@/shared/assets/expenseIcon/medical.svg'
import phone from '@/shared/assets/expenseIcon/phone.svg'
import savings from '@/shared/assets/expenseIcon/savings.svg'
import transport from '@/shared/assets/expenseIcon/transportation.svg'
import salary from '@/shared/assets/incomeIcon/salary.svg'
import additional from '@/shared/assets/incomeIcon/additional.svg'
import allowance from '@/shared/assets/incomeIcon/allowance.svg'
import bonus from '@/shared/assets/incomeIcon/bonus.svg'
import financial from '@/shared/assets/incomeIcon/financial.svg'

interface Props {
  size: 'md' | 'lg'
  icon: keyof typeof expenseIcon
}

const expenseIcon = {
  beauty: beauty,
  cafe: cafe,
  clothes: clothes,
  cultural: cultural,
  dailyNecessities: dailyNecessities,
  dwelling: dwelling,
  education: education,
  etc: etc,
  events: events,
  food: food,
  insurance: insurance,
  medical: medical,
  phone: phone,
  savings: savings,
  transport: transport,
  salary: salary,
  additional: additional,
  allowance: allowance,
  bonus: bonus,
  financial: financial
}

export const ExpenseButton = ({ size, icon }: Props) => {
  return (
    <div
      className={tw(
        'rounded-full bg-neutral-light border border-neutral-light',
        size === 'md' && 'w-[30px] h-[30px] p-1.5',
        size === 'lg' && 'w-[50px] h-[50px] p-2.5'
      )}>
      <img
        src={expenseIcon[icon]}
        alt={icon}
        className="w-full h-full"
      />
    </div>
  )
}
