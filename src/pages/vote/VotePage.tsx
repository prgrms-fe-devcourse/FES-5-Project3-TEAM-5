import { EmptyData, SearchBar, SortButtonList, VoteCard } from '@/features/vote'
import type { Vote } from '@/features/vote/model/type'
import { fetchVoteData } from '@/features/vote/service/fetchVoteData'
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
    setFilteredList(votes)
    setIsLoading(false)
  }

  useEffect(() => {
    loadVotes()
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-5 py-2.5 ">
          {voteListRef.current && filteredList && (
            <>
              <SearchBar
                voteList={voteListRef.current}
                setFilteredList={setFilteredList}
              />
              <SortButtonList
                voteList={voteListRef.current}
                setFilteredList={setFilteredList}
              />
            </>
          )}

          {isDelete && (
            <ConfirmModal
              title="투표 삭제"
              lines={[
                '삭제 후에는 복구가 어려워요.',
                '그래도 진행하시겠습니까?'
              ]}
              onCancel={handleDeleteModal}
              onConfirm={() => {
                handleDeleteModal()
                fetchVoteData()
              }}
              cancelText="취소"
              confirmText="확인"
            />
          )}

          {!isLoading && filteredList && filteredList.length > 0 ? (
            filteredList.map(
              ({
                id,
                title,
                starts_at,
                vote_summary,
                vote_selections,
                vote_options
              }) => (
                <VoteCard
                  key={id}
                  vote_id={id}
                  isMine={vote_summary?.isOwner!}
                  people={vote_selections!.length}
                  question={title}
                  starts_at={starts_at}
                  deadline={vote_summary?.deadline.text!}
                  vote_options={vote_options}
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
