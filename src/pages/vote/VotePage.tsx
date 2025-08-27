import { EmptyData, SearchBar, SortButtonList, VoteCard } from '@/features/vote'
import type { Vote } from '@/features/vote/model/type'
import { fetchVoteData } from '@/features/vote/service/fetchVoteData'
import { sortByDeadlineDesc } from '@/features/vote/utils/filterVoteList'
import AddButton from '@/shared/components/buttons/AddButton'
import Loading from '@/shared/components/loading/Loading'
import ConfirmModal from '@/shared/components/modal/ConfirmModal'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

function VotePage() {
  const [isDelete, setIsDelete] = useState(false)
  const voteListRef = useRef<Vote[] | null>(null)
  const [filteredList, setFilteredList] = useState<Vote[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleDeleteModal = () => setIsDelete(prev => !prev)

  const loadVotes = async () => {
    setIsLoading(true)
    const votes = await fetchVoteData()

    voteListRef.current = votes
    setFilteredList(sortByDeadlineDesc(votes))
    setIsLoading(false)
  }

  useEffect(() => {
    loadVotes()
  }, [])

  return (
    <>
      {isDelete && (
        <ConfirmModal
          title="투표 삭제"
          lines={['삭제 후에는 복구가 어려워요.', '그래도 진행하시겠습니까?']}
          onCancel={handleDeleteModal}
          onConfirm={() => {
            handleDeleteModal()
            fetchVoteData()
          }}
          cancelText="취소"
          confirmText="확인"
        />
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-5 py-2.5 ">
          <SearchBar
            voteList={voteListRef.current!}
            setFilteredList={setFilteredList}
          />
          <SortButtonList
            voteList={voteListRef.current!}
            setFilteredList={setFilteredList}
          />

          {filteredList && filteredList.length > 0 ? (
            filteredList.map(
              ({
                id,
                title,
                starts_at,
                vote_summary,
                vote_options,
                is_active
              }) => (
                <VoteCard
                  key={id}
                  isActive={is_active}
                  voteId={id}
                  isMine={vote_summary?.isOwner!}
                  participants={vote_summary?.participants!}
                  question={title}
                  startsAt={starts_at}
                  deadline={vote_summary!.deadline.text!}
                  voteOptions={vote_options}
                  onDelete={handleDeleteModal}
                />
              )
            )
          ) : (
            <EmptyData />
          )}

          <div className="flex justify-end items-end sticky z-50 bottom-18">
            <Link to="/vote/add">
              <AddButton />
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default VotePage
