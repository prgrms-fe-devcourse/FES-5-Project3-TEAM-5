import { SearchBar, SortButtonList, VoteCard } from '@/features/vote'
import type { Vote } from '@/features/vote/model/type'
import { getVoteData } from '@/features/vote/service/getVoteData'
import AddButton from '@/shared/components/buttons/AddButton'
import ConfirmModal from '@/shared/components/modal/ConfirmModal'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'

function VotePage() {
  const [isDelete, setIsDelete] = useState(false)
  const [voteList, setVoteList] = useState<Vote[] | null>(null)
  // TODO : utils로 빼기
  const handleDeleteModal = () => {
    if (isDelete) {
      setIsDelete(false)
    } else {
      setIsDelete(true)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await getVoteData()
      setVoteList(response)
    }
    fetchData()
  }, [setVoteList])

  return (
    <div className="flex flex-col gap-5 py-2.5 ">
      <SearchBar />
      <SortButtonList />

      {isDelete && (
        <ConfirmModal
          title="투표 삭제"
          lines={['삭제 후에는 복구가 어려워요.', '그래도 진행하시겠습니까?']}
          onCancel={handleDeleteModal}
          onConfirm={() => {
            //데이터 삭제 api 연동
            handleDeleteModal()
          }}
          cancelText="취소"
          confirmText="확인"
        />
      )}
      {voteList &&
        voteList.map(
          ({
            id,
            title,
            starts_at,
            ends_at,
            vote_selections,
            vote_options
          }) => (
            <VoteCard
              key={id}
              people={vote_selections!.length}
              question={title}
              starts_at={starts_at}
              ends_at={ends_at}
              vote_options={vote_options}
              onDelete={handleDeleteModal}
            />
          )
        )}
      <div className="flex justify-end items-end sticky z-50 bottom-18">
        <Link to="/vote/add">
          <AddButton />
        </Link>
      </div>
    </div>
  )
}
export default VotePage
