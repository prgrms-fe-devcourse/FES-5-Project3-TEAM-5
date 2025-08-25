import { useState } from 'react'
import AddButton from '@/shared/components/buttons/AddButton'
import ConfirmModal from '@/shared/components/modal/ConfirmModal'

export const Test = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenModal = () => setIsOpen(true)
  const handleCloseModal = () => setIsOpen(false)

  return (
    <>
      <div>Hello ttomo</div>

      {/* AddButton 클릭 시 모달 오픈 */}
      <AddButton size="sm" onClick={handleOpenModal} />
      <AddButton size="lg" onClick={handleOpenModal} />

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
    </>
  )
}
