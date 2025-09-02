import Input from '@/shared/components/form/Input'
import Comment from './Comment'
import type { Comments } from '../../model/responseBody'
import sendIcon from '@/shared/assets/icons/send.svg'

interface Props {
  isCommentToggleOn: boolean
  commentData?: Comments[]
  onChangeCommentToggle: () => void
  commentRef: React.RefObject<HTMLInputElement | null>
}

export function CommentContainer({
  isCommentToggleOn,
  commentData,
  commentRef,
  onChangeCommentToggle
}: Props) {
  return (
    <div className="flex flex-col gap-2.5 border-t-2 border-neutral-light py-3 ">
      <h3 className="text-[16px] font-bold text-neutral-dark ">댓글</h3>
      <div className="flex relative ">
        <Input
          label="댓글"
          ref={commentRef}
        />
        <img
          className="absolute top-3 right-4 w-5"
          src={sendIcon}
          alt="보내기 아이콘"
        />
      </div>
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
