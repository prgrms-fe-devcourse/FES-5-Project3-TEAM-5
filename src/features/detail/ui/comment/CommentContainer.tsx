import Input from '@/shared/components/form/Input'
import Comment from './Comment'

interface Props {
  isCommentToggleOn: boolean
  onChangeCommentToggle: () => void
}

function CommentContainer({ isCommentToggleOn, onChangeCommentToggle }: Props) {
  return (
    <div className="flex flex-col gap-2.5 border-t-2 border-neutral-light py-3 ">
      <h3 className="text-[16px] font-bold text-neutral-dark ">댓글</h3>
      <Input label="댓글" />
      <Comment
        isCommentToggleOn={isCommentToggleOn}
        onChangeCommentToggle={onChangeCommentToggle}
      />
    </div>
  )
}
export default CommentContainer
