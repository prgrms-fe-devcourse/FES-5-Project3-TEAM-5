import { TotalReportItem } from './TotalReportItem'

export const TotalReport = () => {
  return (
    <div className="w-full h-13 bg-primary-pale flex justify-between items-center px-6">
      <TotalReportItem
        title="수입"
        amount={100000}
      />
      <TotalReportItem
        title="지출"
        amount={100000}
      />
      <TotalReportItem
        title="잔액"
        amount={100000}
      />
    </div>
  )
}
