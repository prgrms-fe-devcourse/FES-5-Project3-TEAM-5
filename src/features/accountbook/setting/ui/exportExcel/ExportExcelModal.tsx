import Input from '@/shared/components/form/Input'
import SubmitButton from '@/shared/components/form/SubmitButton'
import ModalPortal from '@/shared/components/modal/ModalPortal'
import Overlay from '@/shared/components/modal/Overlay'
import SelectDate from './SelectDate'
import { useEffect, useState } from 'react'
import SelectCalendar from './SelectCalendar'
import ModalHeader from './ModalHeader'

interface Props {
  onCancel: () => void
}
function ExportExcelModal({ onCancel }: Props) {
  const [isCalenderOpen, setIsCalenderOpen] = useState(false)
  const openCalender = () => {
    setIsCalenderOpen(!isCalenderOpen)
  }
  useEffect(() => {}, [openCalender])

  return (
    <ModalPortal>
      <Overlay onCancel={onCancel}>
        <ModalHeader closeModal={onCancel} />
        {isCalenderOpen ? (
          <SelectCalendar />
        ) : (
          <div className="flex flex-col gap-5">
            <SelectDate openCalender={openCalender} />
            <div className="flex flex-col gap-1.5">
              <h3 className="text-neutral-dark text-lg font-bold">이메일</h3>
              <Input label="이메일" />
            </div>
            <SubmitButton text="내보내기" />
          </div>
        )}
      </Overlay>
    </ModalPortal>
  )
}
export default ExportExcelModal
