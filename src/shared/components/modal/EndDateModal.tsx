import { useState } from 'react'
import BaseModal from './BaseModal'
import dayjs, { Dayjs } from 'dayjs'
import { tw } from '@/shared/utils/tw'
import Dropdown from './Dropdown'
import { useSelectedDate } from '@/features/calendar'

interface Props {
  open: boolean
  onClose: () => void
  onSelect: (date: Date) => void
  selectedDate?: Date | null // 현재 선택된 종료일
}

function EndDateModal({ open, onClose, onSelect, selectedDate }: Props) {
  // 선택된 날짜가 있으면 해당 날짜로, 없으면 오늘 날짜
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(
    selectedDate ? dayjs(selectedDate) : dayjs()
  )
  const [selected, setSelected] = useState<Dayjs | null>(
    selectedDate ? dayjs(selectedDate) : null
  )

  const startDay = currentMonth.startOf('month').day()
  const daysInMonth = currentMonth.daysInMonth()

  const prevMonth = currentMonth.subtract(1, 'month')
  const nextMonth = currentMonth.add(1, 'month')
  const prevDays = prevMonth.daysInMonth()

  const date = useSelectedDate(s => s.date)

  const dates: { day: number; current: boolean; date: Dayjs }[] = []

  // 이전 달
  for (let i = startDay - 1; i >= 0; i--) {
    const d = prevMonth.date(prevDays - i)
    dates.push({ day: d.date(), current: false, date: d })
  }

  // 이번 달
  for (let i = 1; i <= daysInMonth; i++) {
    const d = currentMonth.date(i)
    dates.push({ day: i, current: true, date: d })
  }

  // 다음 달 (6주 고정)
  for (let i = 1; dates.length < 42; i++) {
    const d = nextMonth.date(i)
    dates.push({ day: i, current: false, date: d })
  }

  // 날짜 클릭
  const handleSelectDate = (date: Dayjs) => {
    if (date.isBefore(dayjs(date), 'day')) return
    setSelected(date)
    onSelect(date.toDate())
    onClose()
  }

  // 연/월 드롭다운
  const years = Array.from({ length: 10 }, (_, i) => dayjs(date).year() + i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)

  return (
    <BaseModal
      isOpen={open}
      onClose={onClose}>
      <div>
        {/* 상단 헤더 (연/월 드롭다운) */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Dropdown
            options={years.map(y => ({ label: `${y}년`, value: y }))}
            value={currentMonth.year()}
            onChange={newYear => setCurrentMonth(currentMonth.year(newYear))}
          />

          <Dropdown
            options={months.map(m => ({ label: `${m}월`, value: m }))}
            value={currentMonth.month() + 1}
            onChange={newMonth =>
              setCurrentMonth(currentMonth.month(newMonth - 1))
            }
          />
        </div>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 text-center text-base text-black font-bold mb-2">
          {['일', '월', '화', '수', '목', '금', '토'].map(d => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* 날짜 grid */}
        <div className="grid grid-cols-7 text-center gap-y-1">
          {dates.map((d, i) => {
            const isSelected =
              selected && d.date.isSame(selected, 'day') && d.current
            return (
              <button
                key={i}
                onClick={() => handleSelectDate(d.date)}
                disabled={d.date.isBefore(date, 'day')}
                className={tw(
                  'h-10 w-10 flex items-center justify-center rounded-full hover:cursor-pointer transition-all duration-150',
                  d.current ? 'text-black' : 'text-gray-300',
                  d.date.isBefore(date, 'day')
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'hover:bg-primary-base hover:text-white',
                  isSelected && 'bg-primary-base text-white'
                )}>
                {d.day}
              </button>
            )
          })}
        </div>
      </div>
    </BaseModal>
  )
}

export default EndDateModal
