import Input from '@/shared/components/form/Input'
import Comment from './Comment'
import type { Comments } from '../../model/responseBody'

interface Props {
  isCommentToggleOn: boolean
  commentData?: Comments[]
  onChangeCommentToggle: () => void
}

export function CommentContainer({
  isCommentToggleOn,
  commentData,
  onChangeCommentToggle
}: Props) {
  return (
    <div className="flex flex-col gap-2.5 border-t-2 border-neutral-light py-3 ">
      <h3 className="text-[16px] font-bold text-neutral-dark ">댓글</h3>
      <Input label="댓글" />
      {commentData &&
        commentData.map(item => (
          <Comment
            key={item.id}
            created_at={item.created_at}
            content={item.content}
            writer={item.users.nickname}
            isCommentToggleOn={isCommentToggleOn}
            onChangeCommentToggle={onChangeCommentToggle}
          />
        ))}
    </div>
  )
}
