import { SearchBar, SortButtonList, VoteCard } from '@/features/vote'
import AddButton from '@/shared/components/buttons/AddButton'
import ConfirmModal from '@/shared/components/modal/ConfirmModal'
import { useState } from 'react'
import { Link } from 'react-router'

function VotePage() {
  const [isDelete, setIsDelete] = useState(false)
  const handleDeleteModal = () => {
    if (isDelete) {
      setIsDelete(false)
    } else {
      setIsDelete(true)
    }
  }

  return (
    <div className="flex flex-col gap-5 py-2.5 ">
      <SearchBar />
      <SortButtonList />
      <VoteCard
        people={45}
        question="   치킨 먹는다 안 먹는다치킨 먹는다 안 먹는다치킨 먹는다 안 먹는다치킨
          먹는다 안 먹는다 치킨 먹는다 안 먹는다"
        isMine={true}
        onDelete={handleDeleteModal}
      />
      {isDelete && (
        <ConfirmModal
          title="투표 삭제"
          lines={['삭제 후에는 복구가 어려워요.', '그래도 진행하시겠습니까?']}
          onCancel={handleDeleteModal}
          onConfirm={() => {
            handleDeleteModal()
          }}
          cancelText="취소"
          confirmText="확인"
        />
      )}
      <VoteCard
        people={45}
        question="dhjkahjkfdshsjkfhjksdhsgjksdh"
        isMine={false}
        onDelete={handleDeleteModal}
      />
      <div className="flex justify-end items-end sticky z-50 bottom-18">
        <Link to="/vote/add">
          <AddButton />
        </Link>
      </div>
    </div>
  )
}
export default VotePage
