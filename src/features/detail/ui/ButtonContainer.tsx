import { useState } from 'react'
import {
  ActiveDislikeIcon,
  ActiveLikeIcon,
  InactiveDislikeIcon,
  InactiveLikeIcon
} from './likeDislikeButtonIcons'

function ButtonContainer() {
  const [isLikeActive, setIsLikeActive] = useState(false)
  const [isDislikeActive, setIsDislikeClicked] = useState(false)

  return (
    <div className="flex gap-7">
      <div
        className="flex flex-col items-center gap-2"
        onClick={() => {
          setIsLikeActive(!isLikeActive)
          setIsDislikeClicked(false)
        }}>
        {isLikeActive ? <ActiveLikeIcon /> : <InactiveLikeIcon />}
        <p>10</p>
      </div>
      <div
        className="flex flex-col items-center gap-2"
        onClick={() => {
          setIsLikeActive(false)
          setIsDislikeClicked(!isDislikeActive)
        }}>
        {isDislikeActive ? <ActiveDislikeIcon /> : <InactiveDislikeIcon />}
        <p>10</p>
      </div>
    </div>
  )
}
export default ButtonContainer
