import Input from '@/shared/components/form/Input'
import Comment from './Comment'
import type { Comments } from '../../model/responseBody'
import sendIcon from '@/shared/assets/icons/send.svg'
import { useUserStore } from '@/shared/stores/useUserStore'
import {
  getCreateFormatDate,
  sortByCreatedAtDesc
} from '../../utils/dateFormat'

interface Props {
  commentData?: Comments[]
  itemId: string
  commentRef: React.RefObject<HTMLInputElement | null>
  handleComments: (item_id: string, user_id: string) => Promise<void>
  onDelete: (itemId: string) => Promise<void>
  handleCommentEdit: (
    commentId: string,
    userId: string,
    content: string
  ) => Promise<void>
}

export function CommentContainer({
  commentData,
  commentRef,
  itemId,
  handleComments,
  handleCommentEdit,
  onDelete
}: Props) {
  const userId = useUserStore.getState().user!.id

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault()
      e.stopPropagation()
      handleComments(itemId, userId)
    }
  }
  const onSubmit = () => {
    handleComments(itemId, userId)
  }

  return (
    <div className="flex flex-col gap-2.5 border-t-2 border-neutral-light py-3 ">
      <h3 className="text-[16px] font-bold text-neutral-dark ">댓글</h3>
      <div className="flex relative ">
        <Input
          label="댓글"
          ref={commentRef}
          onKeyDown={onKeyDown}
        />
        <img
          className="absolute top-3 right-4 w-5"
          src={sendIcon}
          alt="보내기 아이콘"
          onClick={onSubmit}
        />
      </div>
      {commentData &&
        sortByCreatedAtDesc(commentData).map(item => (
          <Comment
            userId={userId}
            commentId={item.id}
            onDelete={onDelete}
            onEdit={handleCommentEdit}
            isMine={item.user_id === userId}
            key={item.id}
            created_at={getCreateFormatDate(item.created_at)}
            content={item.content}
            writer={item.users.nickname}
          />
        ))}
    </div>
  )
}
