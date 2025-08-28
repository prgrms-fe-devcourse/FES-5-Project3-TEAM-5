import { VoteOption, VoteQuestion } from '@/features/vote'
import type { VoteTime } from '@/features/vote/model/requestBody'
import { addVote } from '@/features/vote/service/addVote'
import { AddTimeButtonList } from '@/features/vote/ui/form/AddTimeButtonList'
import SubmitButton from '@/shared/components/form/SubmitButton'
import { useUserStore } from '@/shared/stores/useUserStore'
import { useRef } from 'react'
import { useNavigate } from 'react-router'

function AddVotePage() {
  const voteTimeRef = useRef<VoteTime | null>(null)
  const questionRef = useRef<HTMLTextAreaElement>(null)
  const firstOptionRef = useRef<HTMLInputElement>(null)
  const secondOptionRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    const userId = useUserStore.getState().user?.id
    const { starts_at, ends_at } = voteTimeRef.current!

    const newVote = {
      title: questionRef.current!.value,
      is_active: true,
      starts_at: starts_at!,
      ends_at: ends_at!,
      user_id: userId!
    }
    const newOptions = [
      firstOptionRef.current!.value,
      secondOptionRef.current!.value
    ]

    await addVote(newVote, newOptions)
    navigate('/vote')
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
