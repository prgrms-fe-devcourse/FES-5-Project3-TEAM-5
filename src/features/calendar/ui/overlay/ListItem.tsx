import { ExpenseButton } from '@/shared/components/expenseButton/expenseButton'
import { formatPriceNumber } from '@/shared/utils/format'
import { tw } from '@/shared/utils/tw'
import { Badge } from './Badge'
import dayjs from 'dayjs'

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
  | 'salary'
  | 'additional'
  | 'allowance'
  | 'bonus'
  | 'financial'

const iconMap: Record<IconType, string> = {
  beauty: '미용',
  cafe: '카페',
  clothes: '의류',
  cultural: ' 문화생활',
  dailyNecessities: '생필품',
  dwelling: '주거',
  education: '교육',
  etc: '기타',
  events: '경조사',
  food: '식비',
  insurance: '보험',
  medical: '의료/건강',
  phone: '통신비',
  savings: '저축',
  transport: '교통비',
  salary: '월급',
  additional: '부수입',
  allowance: '용돈',
  bonus: '상여',
  financial: '금융소득'
}
interface Props {
  icon: IconType
  amount: number
  type: 'income' | 'expense'
  recurring: boolean
  installment: {
    months: number
    start_date: string
    end_date: string
  }
}

export const ListItem = ({
  icon,
  amount,
  type,
  recurring,
  installment
}: Props) => {
  console.log(installment)
  return (
    <div className="w-full border-b border-neutral-light p-2.5 flex justify-between items-center">
      <div className="flex items-center gap-2.5 text-size-md">
        <div className="w-[30px] h-[30px] rounded-full bg-gray-50">
          <ExpenseButton
            size="md"
            icon={icon}
          />
        </div>
        <div>{iconMap[icon]}</div>
        <div className="flex items-center gap-1">
          {recurring && <Badge variant="repeat">반복</Badge>}
          {installment.months > 0 && <Badge variant="installment">할부</Badge>}
        </div>
        {installment.months > 0 && (
          <div className="text-size-sm text-neutral-dark flex flex-col">
            <div>
              {dayjs(installment.start_date).format('YY.MM')} 시작 /{' '}
              {installment.months}개월 할부
            </div>
          </div>
        )}
      </div>
      <div
        className={tw(
          'font-bold',
          type === 'income' ? 'text-secondary-blue' : 'text-secondary-red'
        )}>
        {type === 'income' ? '+' : '-'} {formatPriceNumber(amount)} 원
      </div>
    </div>
  )
}
