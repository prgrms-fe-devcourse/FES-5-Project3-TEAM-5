import { tw } from '@/shared/utils/tw'
import type { Reactions } from '../model/responseBody'
import ReactionButtonContainer from './ReactionButtonContainer'
import ToggleMoreButton from './ToggleMoreButton'
import { useNavigate } from 'react-router'
import { deleteAccountItem } from '@/pages/item/delete/deleteAccountItem'
import { useEffect, useRef } from 'react'

interface Props {
  isArticleToggleOn: boolean
  receipt_url?: string
  payment_methods?: string
  writer: string
  isMine: boolean
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
  noDeleteItem: boolean
}

export function DetailContents({
  isArticleToggleOn,
  item_id,
  isMine,
  payment_methods,
  writer,
  receipt_url,
  memo,
  reactions,
  onChangeArticleToggle,
  handleReactions,
  noDeleteItem
}: Props) {
  const navigate = useNavigate()
  const toggleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isArticleToggleOn &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target as Node)
      ) {
        onChangeArticleToggle()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isArticleToggleOn, onChangeArticleToggle])

  const handleDelete = async (id: string) => {
    try {
      if (noDeleteItem) {
        alert('할부 또는 반복 일정은 삭제할 수 없어요.')
        return
      }
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
            <p>{writer}</p>
            {isMine && (
              <div ref={toggleRef}>
                <ToggleMoreButton
                  label="일별 가계부"
                  deletedId={item_id}
                  isOpen={isArticleToggleOn}
                  onChangeToggle={onChangeArticleToggle}
                  onEdit={() => navigate(`/accountBook/item/${item_id}/edit`)}
                  onDelete={handleDelete}
                />
              </div>
            )}
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
