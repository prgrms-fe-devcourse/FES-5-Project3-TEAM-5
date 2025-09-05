import { useEffect, useRef, useState } from 'react'
import BaseModal from '@/shared/components/modal/BaseModal'
import SubmitButton from '@/shared/components/form/SubmitButton'

interface Props {
  isExport: boolean
  onCancel: () => void
  onExport: (selectedDate: { year: number; month: number }) => Promise<void>
}

function ExportExcelModal({ isExport, onCancel, onExport }: Props) {
  const currentYear = new Date().getFullYear()
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0')

  const [selectedYear, setSelectedYear] = useState<number>(currentYear)
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth)

  const years = Array.from({ length: 11 }, (_, i) => currentYear - i)
  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, '0')
  )
  const yearListRef = useRef<HTMLUListElement>(null)
  const monthListRef = useRef<HTMLUListElement>(null)

  // 년 스크롤 조정
  useEffect(() => {
    if (yearListRef.current) {
      const index = years.indexOf(selectedYear)
      const liHeight = 40
      yearListRef.current.scrollTop = index * liHeight
    }
  }, [selectedYear, isExport])

  // 월 스크롤 조정
  useEffect(() => {
    if (monthListRef.current) {
      const index = months.indexOf(selectedMonth)
      const liHeight = 40
      monthListRef.current.scrollTop = index * liHeight
    }
  }, [selectedMonth, isExport])

  const handleExportExcel = async () => {
    await onExport({ year: selectedYear, month: Number(selectedMonth) })
    onCancel()
  }

  return (
    <BaseModal
      isOpen={isExport}
      onClose={onCancel}>
      <h2 className="text-center text-[22px] font-bold text-black">
        엑셀 내보내기
      </h2>

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
                  onClick={() => setSelectedYear(year)}
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
                  onClick={() => setSelectedMonth(month)}
                  className={`px-6 py-2 cursor-pointer text-center rounded-lg text-black hover:translate-0.5 hover:shadow-md ${
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
          onClick={handleExportExcel}
        />
      </div>
    </BaseModal>
  )
}
export default ExportExcelModal
