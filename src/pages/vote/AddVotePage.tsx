import { VoteDeadLine, VoteOption, VoteQuestion } from '@/features/vote'
import SubmitButton from '@/shared/components/form/SubmitButton'

function AddVotePage() {
  return (
    <form
      className="flex flex-col "
      style={{ gap: 'clamp(8px, 5vh, 50px)' }}>
      <VoteDeadLine />
      <VoteQuestion />
      <VoteOption />
      <span></span>
      <SubmitButton text="작성 완료" />
    </form>
  )
}
export default AddVotePage
