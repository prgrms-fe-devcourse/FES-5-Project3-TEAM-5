import { EditTimeButtonList, VoteOption, VoteQuestion } from '@/features/vote'
import { getUserVoteData, updateVote } from '@/features/vote/service/editVote'
import { calculateHoursDiff } from '@/features/vote/utils/calcData'
import SubmitButton from '@/shared/components/form/SubmitButton'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

function EditVotePage() {
  const questionRef = useRef<HTMLTextAreaElement>(null)
  const firstOptionRef = useRef<HTMLInputElement>(null)
  const secondOptionRef = useRef<HTMLInputElement>(null)
  const voteIdRef = useRef<string>(null)
  const [deadline, setDeadline] = useState<number | null>(null)
  const [optionIds, setOptionIds] = useState<{ first: string; second: string }>(
    { first: '', second: '' }
  )
  const params = useParams()
  const navigate = useNavigate()

  const loadUserVote = async () => {
    const votes = await getUserVoteData(params.editId!)

    votes?.forEach(item => {
      voteIdRef.current = item.id
      questionRef.current!.value = item.title
      firstOptionRef.current!.value = item.vote_options[0].content
      secondOptionRef.current!.value = item.vote_options[1].content
      setDeadline(calculateHoursDiff(item.starts_at, item.ends_at))

      setOptionIds({
        first: item.vote_options[0].id,
        second: item.vote_options[1].id
      })
    })
  }

  const handleSubmit = async () => {
    const voteId = params.editId
    if (!voteId) return console.error('voteId 없음')

    const newOptions = [
      { id: optionIds.first, content: firstOptionRef.current!.value },
      { id: optionIds.second, content: secondOptionRef.current!.value }
    ]

    await updateVote({
      voteId,
      title: questionRef.current!.value,
      options: newOptions
    })

    navigate('/vote')
  }

  useEffect(() => {
    loadUserVote()
  }, [])

  return (
    <form
      className="flex flex-col p-5"
      style={{ gap: 'clamp(8px, 5vh, 50px)' }}>
      <EditTimeButtonList deadline={deadline} />
      <VoteQuestion questionRef={questionRef} />
      <VoteOption
        firstOptionRef={firstOptionRef}
        secondOptionRef={secondOptionRef}
      />
      <SubmitButton
        text="작성 완료"
        type="submit"
        onClick={handleSubmit}
      />
    </form>
  )
}
export default EditVotePage
