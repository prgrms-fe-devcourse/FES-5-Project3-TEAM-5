import { EmptyData, SearchBar, SortButtonList, VoteCard } from '@/features/vote'
import type { Vote } from '@/features/vote/model/type'
import { getVoteData } from '@/features/vote/service/vote'
import AddButton from '@/shared/components/buttons/AddButton'
import ConfirmModal from '@/shared/components/modal/ConfirmModal'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

function VotePage() {
  const [isDelete, setIsDelete] = useState(false)
  const voteListRef = useRef<Vote[] | null>(null)
  const [filteredList, setFilteredList] = useState<Vote[] | null>(null)

  const handleDeleteModal = () => setIsDelete(prev => !prev)

  const fetchData = async () => {
    const response = await getVoteData()
    voteListRef.current = response
    setFilteredList(response)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex flex-col gap-5 py-2.5 ">
      {voteListRef.current && filteredList && (
        <SearchBar
          voteList={voteListRef.current}
          setFilteredList={setFilteredList}
        />
      )}

      <SortButtonList />

      {isDelete && (
        <ConfirmModal
          title="투표 삭제"
          lines={['삭제 후에는 복구가 어려워요.', '그래도 진행하시겠습니까?']}
          onCancel={handleDeleteModal}
          onConfirm={() => {
            handleDeleteModal()
            fetchData()
          }}
          cancelText="취소"
          confirmText="확인"
        />
      )}

      {filteredList && filteredList.length > 0 ? (
        filteredList.map(
          ({
            id,
            title,
            starts_at,
            ends_at,
            user_id,
            vote_selections,
            vote_options
          }) => (
            <VoteCard
              key={id}
              writer={user_id}
              people={vote_selections!.length}
              question={title}
              starts_at={starts_at}
              ends_at={ends_at}
              vote_options={vote_options}
              onDelete={handleDeleteModal}
            />
          )
        )
      ) : (
        <EmptyData label="검색 결과" />
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
