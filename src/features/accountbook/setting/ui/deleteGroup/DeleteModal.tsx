import ConfirmModal from '@/shared/components/modal/ConfirmModal'

interface Props {
  isDelete: {
    isOwner: boolean
    delete: boolean
  }
  onCancel: () => void
}

function DeleteModal({ isDelete, onCancel }: Props) {
  const { isOwner, delete: isDeleteFlag } = isDelete

  const handleDelete = () => {}

  return (
    <div>
      <ConfirmModal
        open={isDeleteFlag}
        title="가계부 삭제"
        lines={
          isOwner
            ? ['가계부가 삭제돼요.', '그래도 진행하시겠어요?']
            : ['내가 작성한 기록은 모두 지워져요. ', '그래도 진행하시겠어요?']
        }
        onConfirm={handleDelete}
        onCancel={onCancel}
        confirmText="확인"
        cancelText="취소"
      />
    </div>
  )
}

export default DeleteModal
