import { useState } from 'react'
import {
  ActiveDislikeIcon,
  ActiveLikeIcon,
  InactiveDislikeIcon,
  InactiveLikeIcon
} from './ReactionButtonIcons'
import type { Reactions } from '../model/responseBody'
import { getReactionCount } from '../utils/countReacions'

interface Props {
  reactions: Reactions[]
}

function ReactionButtonContainer({ reactions }: Props) {
  const [isLikeActive, setIsLikeActive] = useState(false)
  const [isDislikeActive, setIsDislikeClicked] = useState(false)
  const { dislike, like } = getReactionCount(reactions)
  console.log(dislike, like)

  return (
    <div className="flex gap-7">
      <div
        className="flex flex-col items-center gap-2"
        onClick={() => {
          setIsLikeActive(!isLikeActive)
          setIsDislikeClicked(false)
        }}>
        {isLikeActive ? <ActiveLikeIcon /> : <InactiveLikeIcon />}
        <p>{like}</p>
      </div>
      <div
        className="flex flex-col items-center gap-2"
        onClick={() => {
          setIsLikeActive(false)
          setIsDislikeClicked(!isDislikeActive)
        }}>
        {isDislikeActive ? <ActiveDislikeIcon /> : <InactiveDislikeIcon />}
        <p>{dislike}</p>
      </div>
    </div>
  )
}
export default ReactionButtonContainer
