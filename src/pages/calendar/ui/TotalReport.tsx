import { useSelectedDate } from '@/features/calendar'
import { TotalReportItem } from './TotalReportItem'

export const TotalReport = () => {
  const amountList = useSelectedDate(s => s.amountList)
  return (
    <div className="w-full bg-primary-pale grid grid-cols-3 justify-center items-center py-5">
      <TotalReportItem
        title="수입"
        amount={amountList.income}
      />
      <TotalReportItem
        title="지출"
        amount={amountList.expense}
      />
      <TotalReportItem
        title="잔액"
        amount={amountList.balance}
      />
    </div>
  )
}
