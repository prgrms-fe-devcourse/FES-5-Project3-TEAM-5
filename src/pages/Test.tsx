import { useState } from 'react'
import AddButton from '@/shared/components/buttons/AddButton'
import ConfirmModal from '@/shared/components/modal/ConfirmModal'
import RepeatInstallmentModal from '@/shared/components/modal/RepeatInstallmentModal'

export const Test = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenModal = () => setIsOpen(true)
  const handleCloseModal = () => setIsOpen(false)

  const [isOpen_2, setIsOpen_2] = useState(false)
  const handleOpenModal_2 = () => setIsOpen_2(true)
  const handleCloseModal_2 = () => setIsOpen_2(false)


  return (
    <>
      <div>Hello ttomo</div>

      {/* AddButton 클릭 시 모달 오픈 */}
      <p>confirm 모달</p>
      <AddButton size="sm" onClick={handleOpenModal} />
      <AddButton size="lg" onClick={handleOpenModal} />

      <p>반복|할부 모달</p>
      <AddButton size="lg" onClick={handleOpenModal_2} />

      {/* 모달 */}
      {isOpen && (
        <ConfirmModal
          title="가계부 삭제"
          lines={["삭제 후에는 복구가 어려워요.","그래도 진행하시겠습니까?"]}
          onCancel={handleCloseModal}
          onConfirm={() => {
            handleCloseModal()
          }}
          cancelText="취소"
          confirmText="확인"
        />
      )}

      {isOpen_2 && (
        <RepeatInstallmentModal onClose={handleCloseModal_2}/>
      )}
    </>
  )
}
