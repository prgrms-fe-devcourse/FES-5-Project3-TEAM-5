import { EditTimeButtonList, VoteOption, VoteQuestion } from '@/features/vote'
import { getUserVoteData } from '@/features/vote/service/editVote'
import SubmitButton from '@/shared/components/form/SubmitButton'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'

function EditVotePage() {
  const questionRef = useRef<HTMLTextAreaElement>(null)
  const firstOptionRef = useRef<HTMLInputElement>(null)
  const secondOptionRef = useRef<HTMLInputElement>(null)
  const [deadline, setDeadline] = useState<number | null>(null)
  const params = useParams()

  const calculateHoursDiff = (start: string, end: string) => {
    const diffMs = new Date(end).getTime() - new Date(start).getTime()
    return Math.floor(diffMs / (1000 * 60 * 60))
  }

  const loadUserVote = async () => {
    const votes = await getUserVoteData(params.editId!)
    votes?.forEach(item => {
      questionRef.current!.value = item.title
      firstOptionRef.current!.value = item.vote_options[0].content
      secondOptionRef.current!.value = item.vote_options[1].content
      setDeadline(calculateHoursDiff(item.starts_at, item.ends_at))
    })
  }

  useEffect(() => {
    loadUserVote()
  }, [])

  return (
    <form
      className="flex flex-col"
      style={{ gap: 'clamp(8px, 5vh, 50px)' }}>
      <EditTimeButtonList deadline={deadline} />
      <VoteQuestion questionRef={questionRef} />
      <VoteOption
        firstOptionRef={firstOptionRef}
        secondOptionRef={secondOptionRef}
      />
      <SubmitButton text="작성 완료" />
    </form>
  )
}
export default EditVotePage
