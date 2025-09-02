import {
  ListItem,
  type IconType
} from '@/features/calendar/ui/overlay/ListItem'
import { CommentContainer, DetailContents } from '@/features/detail'
import type {
  Comments,
  DetailAccountItem
} from '@/features/detail/model/responseBody'
import { insertReaction } from '@/features/detail/service/addReaction'
import {
  getCommentsData,
  getDetailItemData
} from '@/features/detail/service/fetchDetailData'

import Header from '@/shared/components/header/Header'
import { useUserStore } from '@/shared/stores/useUserStore'

import dayjs from 'dayjs'
import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router'

function DetailAccountItemPage() {
  const { date, id } = useParams()
  const title = date ? dayjs(date).format('M월 D일 ddd') : ''
  const [isArticleToggleOn, setIsArticleToggleOn] = useState(false)
  const [isCommentToggleOn, setCommentToggleOn] = useState(false)
  const [detailItemData, setDetailItemData] = useState<
    DetailAccountItem[] | null
  >(null)
  const [commentsData, setCommentsData] = useState<Comments[] | null>(null)

  const onChangeArticleToggle = () => {
    setIsArticleToggleOn(!isArticleToggleOn)
  }

  const onChangeCommentToggle = () => {
    setCommentToggleOn(!isCommentToggleOn)
  }

  const handleReactions = async (itemId: string, kind: string) => {
    const userId = useUserStore.getState().user!.id
    try {
      await insertReaction(itemId, userId, kind)
      await loadData()
    } catch (error) {
      console.log('리액션 에러', error)

      alert('리액션 중 오류가 발생했습니다.')
    }
  }

  const loadData = async () => {
    if (!id) return
    const detailData = await getDetailItemData(id)
    setDetailItemData(detailData)
    const commentsData = await getCommentsData(id)
    setCommentsData(commentsData)
  }
  useEffect(() => {
    loadData()
  }, [id])

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
                onChangeArticleToggle={onChangeArticleToggle}
                handleReactions={handleReactions}
              />
            </Fragment>
          ))}

        <CommentContainer
          commentData={commentsData ?? []}
          isCommentToggleOn={isCommentToggleOn}
          onChangeCommentToggle={onChangeCommentToggle}
        />
      </div>
    </>
  )
}
export default DetailAccountItemPage
