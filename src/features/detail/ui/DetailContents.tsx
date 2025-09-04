import { tw } from '@/shared/utils/tw'
import type { Reactions } from '../model/responseBody'
import ReactionButtonContainer from './ReactionButtonContainer'
import ToggleMoreButton from './ToggleMoreButton'
import { useNavigate } from 'react-router'
import { deleteAccountItem } from '@/pages/item/delete/deleteAccountItem'

interface Props {
  isArticleToggleOn: boolean
  receipt_url?: string
  payment_methods?: string
  user_id: string
  memo?: string
  item_id: string
  reactions: Reactions[]
  onChangeArticleToggle: () => void
  handleReactions: ({
    itemId,
    userId,
    kind
  }: {
    itemId: string
    userId: string
    kind: string
  }) => Promise<void>
}

export function DetailContents({
  isArticleToggleOn,
  item_id,
  payment_methods,
  user_id,
  receipt_url,
  memo,
  reactions,
  onChangeArticleToggle,
  handleReactions
}: Props) {

  const navigate = useNavigate()

  const handleDelete = async (id: string) => {
    try {
      await deleteAccountItem(id)
      navigate(-1)
    } catch (error) {
      console.error('삭제 에러:', error)
      alert('삭제 중 오류가 발생했습니다.')
    }
  }

  return (
    <>
      <div className="flex flex-col w-full items-center gap-4 ">
        <div
          className={tw(
            'relative flex  w-full  text-neutral-dark text-size-md',
            !payment_methods && 'mb-4'
          )}>
          {payment_methods && <p>결제수단: {payment_methods}</p>}
          <div className="flex absolute right-0">
            <p>{user_id}</p>
            <ToggleMoreButton
              deletedId={item_id}
              isOpen={isArticleToggleOn}
              onChangeToggle={onChangeArticleToggle}
              onEdit={() => navigate(`/accountBook/item/${item_id}/edit`)}
              onDelete={handleDelete}
            />
          </div>
        </div>
        {receipt_url && (
          <img
            className="rounded-lg w-full"
            src={receipt_url}
            alt="사진"
          />
        )}
        <p className=" w-full  text-black text-[16px] mb-3">{memo}</p>
        <ReactionButtonContainer
          item_id={item_id}
          reactions={reactions}
          onChangeReaction={handleReactions}
        />
      </div>
    </>
  )
}
