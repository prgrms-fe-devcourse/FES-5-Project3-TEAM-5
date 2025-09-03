import SubmitButton from '@/shared/components/form/SubmitButton'

interface Props {
  yearListRef: React.RefObject<HTMLUListElement | null>
  monthListRef: React.RefObject<HTMLUListElement | null>
  years: number[]
  months: string[]
  selectedYear: number
  selectedMonth: string
  onChangeSelectedYear: React.Dispatch<React.SetStateAction<number>>
  onChangeSelectedMonth: React.Dispatch<React.SetStateAction<string>>
}

export default function SelectCalendar({
  yearListRef,
  monthListRef,
  years,
  months,
  selectedYear,
  selectedMonth,
  onChangeSelectedYear,
  onChangeSelectedMonth
}: Props) {
  return (
    <div className="flex flex-col items-center mt-6 gap-2">
      <div className="flex gap-16 mb-4">
        {/* 년도 리스트 */}
        <div className="flex flex-col items-center">
          <ul
            ref={yearListRef}
            className=" max-h-40 overflow-y-auto overflow-x-hidden rounded-lg pr-4  custom-scrollbar">
            {years.map(year => (
              <li
                key={year}
                onClick={() => onChangeSelectedYear(year)}
                className={`px-8  py-2 cursor-pointer text-center rounded-lg text-black hover:translate-0.5 hover:shadow-md ${
                  selectedYear === year
                    ? 'bg-primary-light '
                    : 'hover:bg-gray-100'
                }`}>
                {year}년
              </li>
            ))}
          </ul>
        </div>

        {/* 월 리스트 */}
        <div className="flex flex-col items-center">
          <ul
            ref={monthListRef}
            className="max-h-40 overflow-y-auto overflow-x-hidden  pr-4  rounded-lg custom-scrollbar">
            {months.map(month => (
              <li
                key={month}
                onClick={() => onChangeSelectedMonth(month)}
                className={`px-8 py-2 cursor-pointer text-center rounded-lg text-black hover:translate-0.5 hover:shadow-md ${
                  selectedMonth === month
                    ? 'bg-primary-light'
                    : 'hover:bg-gray-100'
                }`}>
                {month}월
              </li>
            ))}
          </ul>
        </div>
      </div>

      <SubmitButton
        text="내보내기"
        type="button"
      />
    </div>
  )
}
