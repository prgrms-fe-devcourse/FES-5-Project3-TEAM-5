import { useEffect, useState } from 'react'
import {
  ActiveDislikeIcon,
  ActiveLikeIcon,
  InactiveDislikeIcon,
  InactiveLikeIcon
} from './ReactionButtonIcons'
import type { Reactions } from '../model/responseBody'
import { getReactionCount, getUserReaction } from '../utils/getReaction'
import { useUserStore } from '@/shared/stores/useUserStore'
import { throttle } from '../../../shared/utils/throttle'

interface Props {
  reactions: Reactions[]
  item_id: string
  onChangeReaction: ({
    itemId,
    userId,
    kind
  }: {
    itemId: string
    userId: string
    kind: string
  }) => Promise<void>
}

function ReactionButtonContainer({
  reactions,
  onChangeReaction,
  item_id
}: Props) {
  const [isLikeActive, setIsLikeActive] = useState(false)
  const [isDislikeActive, setIsDislikeClicked] = useState(false)
  const { dislikeCount, likeCount } = getReactionCount(reactions)
  const userId = useUserStore.getState().user!.id

  // 서버 요청만 throttle 적용
  const throttledChangeReaction = throttle(kind => {
    onChangeReaction({ itemId: item_id, kind, userId })
  }, 500)

  const handleReactions = (kind: string) => {
    if (kind === 'like') {
      setIsLikeActive(true)
      setIsDislikeClicked(false)
    }
    if (kind === 'dislike') {
      setIsLikeActive(false)
      setIsDislikeClicked(true)
    }
    throttledChangeReaction(kind)
  }

  useEffect(() => {
    const { kind } = getUserReaction(reactions, userId)
    if (kind === 'dislike') setIsDislikeClicked(true)
    if (kind === 'like') setIsLikeActive(true)
  }, [reactions])

  return (
    <div className="flex gap-7">
      <div
        className="flex flex-col items-center gap-2"
        onClick={() => {
          handleReactions('like')
        }}>
        {isLikeActive ? <ActiveLikeIcon /> : <InactiveLikeIcon />}
        <p>{likeCount}</p>
      </div>
      <div
        className="flex flex-col items-center gap-2"
        onClick={() => {
          handleReactions('dislike')
        }}>
        {isDislikeActive ? <ActiveDislikeIcon /> : <InactiveDislikeIcon />}
        <p>{dislikeCount}</p>
      </div>
    </div>
  )
}
export default ReactionButtonContainer
