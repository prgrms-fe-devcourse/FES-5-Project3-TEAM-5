import {
  ListItem,
  type IconType
} from '@/features/calendar/ui/overlay/ListItem'
import { CommentContainer, DetailContents } from '@/features/detail'
import type {
  Comments,
  DetailAccountItem
} from '@/features/detail/model/responseBody'
import { insertComment } from '@/features/detail/service/addComment'
import { insertReaction } from '@/features/detail/service/addReaction'
import { deleteComment } from '@/features/detail/service/deleteComment'
import {
  getCommentsData,
  getDetailItemData
} from '@/features/detail/service/fetchDetailData'
import { updateComment } from '@/features/detail/service/updateComment'
import Header from '@/shared/components/header/Header'
import dayjs from 'dayjs'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'

function DetailAccountItemPage() {
  const { date, id } = useParams()
  const title = date ? dayjs(date).format('M월 D일 ddd') : ''
  const [isArticleToggleOn, setIsArticleToggleOn] = useState(false)
  const [detailItemData, setDetailItemData] = useState<
    DetailAccountItem[] | null
  >(null)
  const [commentsData, setCommentsData] = useState<Comments[] | null>(null)
  const commentRef = useRef<HTMLInputElement>(null)
  const itemId = detailItemData?.[0]?.id

  const onOpenArticleToggle = () => {
    setIsArticleToggleOn(!isArticleToggleOn)
  }
  const noDeleteItem =
    detailItemData?.[0]?.recurring_rule_id ||
    detailItemData?.[0]?.installment_plan_id

  const handleReactions = async ({
    itemId,
    userId,
    kind
  }: {
    itemId: string
    userId: string
    kind: string
  }) => {
    try {
      await insertReaction(itemId, userId, kind)
      fetchDetailData(id!)
    } catch (error) {
      console.log('리액션 에러', error)
      alert('리액션 중 오류가 발생했습니다.')
    }
  }

  const handleComments = async (item_id: string, user_id: string) => {
    if (commentRef.current?.value.trim() === '') {
      return alert('공백은 입력할 수 없습니다!')
    }
    try {
      const request = {
        item_id,
        user_id,
        content: commentRef.current!.value!
      }
      await insertComment(request)
      fetchCommentData(id!)
      if (commentRef.current) {
        commentRef.current.value = ''
      }
    } catch (error) {
      console.log(' 댓글 업로드  에러', error)

      alert('댓글 업로드 중 오류가 발생했습니다.')
    }
  }

  const handleCommentEdit = async (
    commentId: string,
    userId: string,
    content: string
  ) => {
    if (!commentId || !userId)
      return alert('댓글 수정 중, 필요한 정보가 부족합니다')
    try {
      const request = {
        id: commentId,
        item_id: String(itemId),
        user_id: userId,
        content: content
      }
      await updateComment(request!)
      fetchCommentData(id!)
    } catch (error) {
      console.log('댓글 수정 에러', error)

      alert('댓글 수정 중 오류가 발생했습니다.')
    }
  }

  const handleCommentDelete = async (deletedId: string) => {
    try {
      await deleteComment(deletedId)
      fetchCommentData(id!)
    } catch (error) {
      console.error('댓글 삭제 실패:', error)
      alert('댓글 삭제 중 오류가 발생했습니다.')
    }
  }

  const fetchCommentData = async (id: string) => {
    const commentsData = await getCommentsData(id)
    setCommentsData(commentsData)
  }
  const fetchDetailData = async (id: string) => {
    const detailData = await getDetailItemData(id)
    setDetailItemData(detailData)
  }

  useEffect(() => {
    if (!id) return
    fetchDetailData(id)
    fetchCommentData(id)
  }, [])

  return (
    <>
      <Header title={title} />
      <div className="flex flex-col p-4 gap-2">
        {detailItemData &&
          detailItemData.map(item => (
            <Fragment key={item.id}>
              <ListItem
                key={item.id}
                recurring={!!item.recurring_rule_id}
                installment={{
                  months: item.installment_plans?.months ?? 0,
                  start_date: item.installment_plans?.start_date ?? '',
                  end_date: item.installment_plans?.end_date ?? ''
                }}
                icon={item.categories?.name as IconType}
                amount={Number(item.amount)}
                type={item.type}
              />
              <DetailContents
                item_id={String(item.id)}
                user_id={item.users.nickname}
                receipt_url={item.receipt_url!}
                payment_methods={item.payment_methods?.type}
                memo={item.memo ?? ''}
                reactions={item.reactions}
                isArticleToggleOn={isArticleToggleOn}
                onChangeArticleToggle={onOpenArticleToggle}
                handleReactions={handleReactions}
                noDeleteItem={!!noDeleteItem}
              />
            </Fragment>
          ))}

        <CommentContainer
          onDelete={handleCommentDelete}
          itemId={String(itemId)}
          handleComments={handleComments}
          commentRef={commentRef}
          commentData={commentsData ?? []}
          handleCommentEdit={handleCommentEdit}
        />
      </div>
    </>
  )
}
export default DetailAccountItemPage
