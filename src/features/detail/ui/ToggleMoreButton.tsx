import toggleMoreIcon from '@/shared/assets/icons/toggleMore.svg'
import ConfirmModal from '@/shared/components/modal/ConfirmModal'
import { useState } from 'react'

interface Props {
  label: string
  isOpen: boolean
  deletedId: string
  onChangeToggle: () => void
  onEdit?: () => void
  onDelete?: (deletedId: string) => Promise<void>
}
function ToggleMoreButton({
  label,
  isOpen,
  deletedId,
  onEdit,
  onDelete,
  onChangeToggle
}: Props) {
  const [isDelete, setIsDelete] = useState(false)
  const handleToggle = () => {
    onChangeToggle()
  }

  return (
    <>
      <div
        className="relative cursor-pointer"
        onClick={handleToggle}>
        {isOpen && (
          <div className="absolute right-0 top-5 w-25  shadow-md rounded-md bg-white text-center border-0.5 cursor-pointer z-10">
            <button
              className="rounded-t-md  w-full p-2  hover:bg-neutral-light  text-black text-size-md cursor-pointer"
              onClick={onEdit}>
              수정하기
            </button>
            <button
              className="rounded-b-md w-full p-2  hover:bg-neutral-light  text-red-600 text-size-md cursor-pointer"
              onClick={() => setIsDelete(true)}>
              삭제하기
            </button>
          </div>
        )}
        <img
          src={toggleMoreIcon}
          alt=""
        />
      </div>
      <ConfirmModal
        open={isDelete}
        title={`${label} 삭제`}
        lines={['삭제 후에는 복구가 어려워요.', '그래도 진행하시겠습니까?']}
        onCancel={() => setIsDelete(false)}
        onConfirm={async () => {
          if (onDelete) {
            await onDelete(deletedId)
          }
          setIsDelete(false)
        }}
        cancelText="취소"
        confirmText="확인"
      />
    </>
  )
}
export default ToggleMoreButton
