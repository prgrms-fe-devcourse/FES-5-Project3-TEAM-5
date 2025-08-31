import SubmitButton from '@/shared/components/form/SubmitButton'
import { useEffect, useRef, useState } from 'react'

export default function SelectCalendar() {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 11 }, (_, i) => currentYear - i)
  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, '0')
  )

  const [selectedYear, setSelectedYear] = useState<number>(currentYear)
  const [selectedMonth, setSelectedMonth] = useState<string>('01')

  const yearListRef = useRef<HTMLUListElement>(null)
  const monthListRef = useRef<HTMLUListElement>(null)

  // 년 선택 시 스크롤 위치 조정
  useEffect(() => {
    if (yearListRef.current) {
      const index = years.indexOf(selectedYear)
      const liHeight = 40 // li 높이(px), padding 포함
      yearListRef.current.scrollTop = index * liHeight
    }
  }, [selectedYear])

  // 월 선택 시 스크롤 위치 조정
  useEffect(() => {
    if (monthListRef.current) {
      const index = months.indexOf(selectedMonth)
      const liHeight = 40
      monthListRef.current.scrollTop = index * liHeight
    }
  }, [selectedMonth])

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-16 mb-4">
        {/* 년도 리스트 */}

        <div className="flex flex-col items-center">
          <ul
            ref={yearListRef}
            className=" max-h-40 overflow-y-auto overflow-x-hidden rounded-lg pr-4  custom-scrollbar">
            {years.map(year => (
              <li
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-10 py-2 cursor-pointer text-center rounded-lg text-black hover:translate-0.5 hover:shadow-md ${
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
                onClick={() => setSelectedMonth(month)}
                className={`px-10 py-2 cursor-pointer text-center rounded-lg text-black hover:translate-0.5 hover:shadow-md ${
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

      <SubmitButton text="선택 완료" />
    </div>
  )
}
