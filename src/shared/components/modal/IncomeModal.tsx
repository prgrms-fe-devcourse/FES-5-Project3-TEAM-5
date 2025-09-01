import { useState } from 'react'
import BaseModal from './BaseModal'
import Toggle from '../toggle/Toggle'
import { tw } from '@/shared/utils/tw'
import SubmitButton from '../form/SubmitButton'
import SingleTab from '@/pages/item/add/components/SingleTab'
import EndDateModal from './EndDateModal'
import dayjs from 'dayjs'
import type { RepeatInstallmentData } from '@/pages/item/add/saveAccountItem'

interface Props {
  open: boolean
  onClose: () => void
  onSave: (data: RepeatInstallmentData) => void
  initialData?: RepeatInstallmentData
}

// 매핑 테이블
const mapping: Record<string, string> = {
  매일: '격일',
  격일: '매일',
  매주: '격주',
  격주: '매주',
  매월: '격월',
  격월: '매월',
  매년: '격년',
  격년: '매년'
}

function IncomeModal({ open, onClose, onSave, initialData }: Props) {
  const [isBiMonthly, setIsBiMonthly] = useState(initialData?.isBiMonthly ?? false) // 토글 상태
  const [selectedPeriod, setSelectedPeriod] = useState(initialData?.selectedPeriod ?? '매일') // 주기 상태

  const [endDate, setEndDate] = useState<Date | null>(initialData?.endDate ?? null) // 종료일 상태
  const [isEndDateModalOpen, setIsEndDateModalOpen] = useState(false) // 종료일 모달 열림 상태

  // 토글 상태에 따라 값 변경
  const periods = isBiMonthly
    ? ['격일', '격주', '격월', '격년']
    : ['매일', '매주', '매월', '매년']

  // 토글 변경 시 매핑
  const handleToggleChange = (next: boolean) => {
    setIsBiMonthly(next)
    setSelectedPeriod(prev => mapping[prev] ?? prev)
  }

   return (
    <BaseModal isOpen={open} onClose={onClose}>
      <div className="min-h-[130px]">
        {/* 상단 탭 - 반복 */}
        <div className="mt-5">
          <SingleTab label="반복" />
        </div>

        {/* 종료일 + 토글 */}
        <div className="flex justify-between mt-2">
          <button
            type="button"
            onClick={() => setIsEndDateModalOpen(true)} // 종료일 모달 열기
            className="flex items-center justify-center gap-2 hover:cursor-pointer">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.8337 2.33317H13.167V1.49984C13.167 1.27882 13.0792 1.06686 12.9229 0.910582C12.7666 0.754301 12.5547 0.666504 12.3337 0.666504C12.1126 0.666504 11.9007 0.754301 11.7444 0.910582C11.5881 1.06686 11.5003 1.27882 11.5003 1.49984V2.33317H6.50033V1.49984C6.50033 1.27882 6.41253 1.06686 6.25625 0.910582C6.09997 0.754301 5.88801 0.666504 5.66699 0.666504C5.44598 0.666504 5.23402 0.754301 5.07774 0.910582C4.92146 1.06686 4.83366 1.27882 4.83366 1.49984V2.33317H3.16699C2.50395 2.33317 1.86807 2.59656 1.39923 3.0654C0.930384 3.53424 0.666992 4.17013 0.666992 4.83317V14.8332C0.666992 15.4962 0.930384 16.1321 1.39923 16.6009C1.86807 17.0698 2.50395 17.3332 3.16699 17.3332H14.8337C15.4967 17.3332 16.1326 17.0698 16.6014 16.6009C17.0703 16.1321 17.3337 15.4962 17.3337 14.8332V4.83317C17.3337 4.17013 17.0703 3.53424 16.6014 3.0654C16.1326 2.59656 15.4967 2.33317 14.8337 2.33317ZM15.667 14.8332C15.667 15.0542 15.5792 15.2661 15.4229 15.4224C15.2666 15.5787 15.0547 15.6665 14.8337 15.6665H3.16699C2.94598 15.6665 2.73402 15.5787 2.57774 15.4224C2.42146 15.2661 2.33366 15.0542 2.33366 14.8332V8.99984H15.667V14.8332ZM15.667 7.33317H2.33366V4.83317C2.33366 4.61216 2.42146 4.4002 2.57774 4.24392C2.73402 4.08764 2.94598 3.99984 3.16699 3.99984H4.83366V4.83317C4.83366 5.05418 4.92146 5.26615 5.07774 5.42243C5.23402 5.57871 5.44598 5.6665 5.66699 5.6665C5.88801 5.6665 6.09997 5.57871 6.25625 5.42243C6.41253 5.26615 6.50033 5.05418 6.50033 4.83317V3.99984H11.5003V4.83317C11.5003 5.05418 11.5881 5.26615 11.7444 5.42243C11.9007 5.57871 12.1126 5.6665 12.3337 5.6665C12.5547 5.6665 12.7666 5.57871 12.9229 5.42243C13.0792 5.26615 13.167 5.05418 13.167 4.83317V3.99984H14.8337C15.0547 3.99984 15.2666 4.08764 15.4229 4.24392C15.5792 4.4002 15.667 4.61216 15.667 4.83317V7.33317Z"
                fill="#BBBBBB"
              />
            </svg>
            {endDate ? dayjs(endDate).format('YYYY.MM.DD') : '종료일 미설정'}
          </button>

          <div>
            <Toggle
              checked={isBiMonthly}
              onChange={handleToggleChange}
              leftLabel="매월"
              rightLabel="격월"
            />
          </div>
        </div>

        {/* 주기 버튼 */}
        <div className="mt-5 grid grid-cols-4 gap-3">
          {periods.map(p => (
            <button
              key={p}
              type="button"
              onClick={() => setSelectedPeriod(p)}
              className={tw(
                'h-11 rounded-lg text-size-md hover:cursor-pointer',
                selectedPeriod === p
                  ? 'bg-primary-base text-white'
                  : 'bg-neutral-light text-gray-600 hover:bg-gray-200'
              )}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* 안내 문구 */}
      <p className="mt-4 text-sm text-secondary-red text-center">
        {!endDate ? '종료일을 선택해주세요' : '\u00A0'}
      </p>

      {/* 완료 버튼 */}
      <div className="mt-2">
        <SubmitButton
          text="반복 설정"
          disabled={!endDate}
          onClick={() => {
            onSave({ mode: '반복', selectedPeriod, isBiMonthly, endDate })
          }}
        />
      </div>
      
      {/* 종료일 모달 */}
      <EndDateModal
        open={isEndDateModalOpen}
        onClose={() => setIsEndDateModalOpen(false)}
        onSelect={date => setEndDate(date)}
        selectedDate={endDate}  // 이미 선택된 날짜를 넘김
      />
    </BaseModal>
  )
}
export default IncomeModal