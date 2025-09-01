import { ListItem } from '@/features/calendar/ui/overlay/ListItem'
import CommentContainer from '@/features/detail/ui/comment/CommentContainer'
import DetailContents from '@/features/detail/ui/DetailContents'
import Header from '@/shared/components/header/Header'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

function DetailAccountItemPage() {
  const { date } = useParams()
  const title = date ? dayjs(date).format('M월 D일 ddd') : ''
  const [isArticleToggleOn, setIsArticleToggleOn] = useState(false)
  const [isCommentToggleOn, setCommentToggleOn] = useState(false)
  const onChangeArticleToggle = () => {
    setIsArticleToggleOn(!isArticleToggleOn)
  }

  const onChangeCommentToggle = () => {
    setCommentToggleOn(!isCommentToggleOn)
  }

  useEffect(() => {}, [onChangeArticleToggle])
  return (
    <>
      <Header title={title} />
      <div className="flex flex-col p-4 gap-2">
        <ListItem
          icon="beauty"
          amount={44000000}
          type={'income'}
          recurring={false}
          installment={false}
        />
        <DetailContents
          isArticleToggleOn={isArticleToggleOn}
          onChangeArticleToggle={onChangeArticleToggle}
        />
        <CommentContainer
          isCommentToggleOn={isCommentToggleOn}
          onChangeCommentToggle={onChangeCommentToggle}
        />
      </div>
    </>
  )
}
export default DetailAccountItemPage
