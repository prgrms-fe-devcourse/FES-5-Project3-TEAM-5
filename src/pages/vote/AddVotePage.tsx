import { VoteOption, VoteQuestion } from '@/features/vote'
import type { VotesTable, VoteTime } from '@/features/vote/model/requestBody'
import { addVote } from '@/features/vote/service/addVote'
import { AddTimeButtonList } from '@/features/vote/ui/form/AddTimeButtonList'
import { validateAddVote } from '@/features/vote/utils/validation'
import SubmitButton from '@/shared/components/form/SubmitButton'
import { useSnackbarStore } from '@/shared/stores/useSnackbarStore'
import { useUserStore } from '@/shared/stores/useUserStore'
import { useRef } from 'react'
import { useNavigate } from 'react-router'

function AddVotePage() {
  const voteTimeRef = useRef<VoteTime | null>(null)
  const questionRef = useRef<HTMLTextAreaElement>(null)
  const firstOptionRef = useRef<HTMLInputElement>(null)
  const secondOptionRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const showSnackbar = useSnackbarStore(state => state.showSnackbar)

  const handleSubmit = async () => {
    const userId = useUserStore.getState().user?.id
    const voteTime = voteTimeRef.current
    const title = questionRef.current?.value
    const firstOption = firstOptionRef.current?.value
    const secondOption = secondOptionRef.current?.value

    const errorMessage = validateAddVote({
      userId,
      voteTime,
      title,
      firstOption,
      secondOption
    })

    if (errorMessage) {
      showSnackbar({
        type: 'error',
        text: errorMessage
      })
      return
    }

    try {
      const newVote: VotesTable = {
        title: title!,
        is_active: true,
        starts_at: voteTime!.starts_at,
        ends_at: voteTime!.ends_at,
        user_id: userId!
      }

      await addVote(newVote, [firstOption!, secondOption!])
      showSnackbar({ type: 'success', text: '투표가 생성되었습니다' })
      navigate('/vote')
    } catch (error) {
      showSnackbar({ type: 'error', text: '투표 생성 중 오류가 발생했습니다' })
    }
  }

  return (
    <form
      className="flex flex-col p-5 "
      style={{ gap: 'clamp(8px, 5vh, 50px)' }}>
      <div>
        <h3 className="text-size-lg font-bold text-neutral-dark mb-3">
          투표 종료 시간
        </h3>
        <AddTimeButtonList voteTimeRef={voteTimeRef} />
      </div>
      <VoteQuestion questionRef={questionRef} />
      <VoteOption
        firstOptionRef={firstOptionRef}
        secondOptionRef={secondOptionRef}
      />
      <span></span>
      <SubmitButton
        text="작성 완료"
        type="submit"
        onClick={handleSubmit}
      />
    </form>
  )
}
export default AddVotePage
