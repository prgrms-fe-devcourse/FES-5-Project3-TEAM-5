import VoteDeadLine from '@/features/vote/ui/form/VoteDeadLine'
import VoteOption from '@/features/vote/ui/form/VoteOption'
import VoteQuestion from '@/features/vote/ui/form/VoteQuestion'
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
