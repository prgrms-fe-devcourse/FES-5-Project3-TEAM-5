import { EmptyData, SearchBar, SortButtonList, VoteCard } from '@/features/vote'
import type { TotalVote } from '@/features/vote/model/responseBody'
import { deleteVote } from '@/features/vote/service/deleteVote'
import { fetchVoteData } from '@/features/vote/service/fetchVoteData'
import { insertSelectVote } from '@/features/vote/service/selectVote'
import { sortByDeadlineDesc } from '@/features/vote/utils/filterVoteList'
import AddButton from '@/shared/components/buttons/AddButton'
import ScrollToTopButton from '@/shared/components/buttons/ScrollToTopButton'
import Loading from '@/shared/components/loading/Loading'
import ConfirmModal from '@/shared/components/modal/ConfirmModal'
import { useSnackbarStore } from '@/shared/stores/useSnackbarStore'
import { useUserStore } from '@/shared/stores/useUserStore'
import { throttle } from '@/shared/utils/throttle'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

function VotePage() {
  const [isDelete, setIsDelete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [filteredList, setFilteredList] = useState<TotalVote[] | null>(null)
  const voteListRef = useRef<TotalVote[] | null>(null)
  const deleteIdRef = useRef<string | null>(null)
  const userId = useUserStore.getState().user?.id
  const showSnackbar = useSnackbarStore(state => state.showSnackbar)

  const openDeleteModal = (id?: string) => {
    if (id) deleteIdRef.current = id
    setIsDelete(prev => !prev)
  }

  const handleConfirmDelete = async () => {
    if (!deleteIdRef.current) return
    try {
      await deleteVote(deleteIdRef.current)
      await loadVotes()
      setIsDelete(false)
      showSnackbar({ type: 'success', text: '투표가 삭제 되었습니다' })
    } catch (error) {
      showSnackbar({ type: 'error', text: '투표 삭제 중 오류가 발생했습니다' })
    }
  }

  const handleSelectOptions = throttle(
    async (vote_id: string, option_id: string) => {
      try {
        await insertSelectVote(vote_id, option_id)
        await loadVotes()
        showSnackbar({ type: 'success', text: '투표가 등록되었습니다' })
      } catch (error) {
        showSnackbar({
          type: 'error',
          text: '투표 선택 중 오류가 발생했습니다'
        })
      }
    },
    1000
  )

  const loadVotes = async () => {
    setIsLoading(true)
    try {
      const votes = await fetchVoteData(userId!)
      voteListRef.current = votes
      setFilteredList(sortByDeadlineDesc(votes))
    } catch (error) {
      showSnackbar({
        type: 'error',
        text: '투표 데이터를 불러오는 중 오류가 발생했습니다'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadVotes()
  }, [])

  return (
    <>
      <ConfirmModal
        open={isDelete}
        title="투표 삭제"
        lines={['삭제 후에는 복구가 어려워요.', '그래도 진행하시겠습니까?']}
        onCancel={openDeleteModal}
        onConfirm={() => {
          handleConfirmDelete()
        }}
        cancelText="취소"
        confirmText="확인"
      />

      {isLoading ? (
        <Loading className="" />
      ) : (
        <div className="flex flex-col gap-5 p-4 ">
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
                my_select,
                vote_summary,
                vote_options,
                vote_selections
              }) => (
                <VoteCard
                  userId={userId!}
                  key={id}
                  voteId={id}
                  isMine={vote_summary!.isOwner}
                  totalParticipants={vote_summary!.participants}
                  question={title}
                  startsAt={starts_at}
                  deadline={vote_summary!.deadline.text!}
                  voteOptions={vote_options}
                  voteSelections={vote_selections!}
                  mySelect={my_select ?? []}
                  openDeleteModal={openDeleteModal}
                  onSelect={handleSelectOptions}
                />
              )
            )
          ) : (
            <EmptyData />
          )}

          <div className="flex flex-col justify-end items-end sticky z-50 bottom-18">
            <ScrollToTopButton className={'mb-4'} />
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
