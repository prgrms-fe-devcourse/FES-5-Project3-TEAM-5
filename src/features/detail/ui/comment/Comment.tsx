import { useState } from 'react'
import ToggleMoreButton from '../ToggleMoreButton'

interface Props {
  commentId: string
  content: string
  writer: string
  isMine: boolean
  created_at: string
  onDelete: (itemId: string) => Promise<void>
}

function Comment({
  content,
  writer,
  isMine,
  created_at,
  commentId,
  onDelete
}: Props) {
  const [isToggleOn, setIsToggleOn] = useState(false)
  const onChangeToggle = () => {
    setIsToggleOn(!isToggleOn)
  }
  return (
    <div
      className="border-b-2 border-neutral-light  py-2"
      onClick={onChangeToggle}>
      <div className="flex justify-between mb-2.5">
        <span className="flex-1 text-size-md text-neutral-dark">{writer}</span>
        <span className="text-size-sm text-neutral-DEFAULT">{created_at}</span>
        <div className="w-5">
          {isMine && (
            <ToggleMoreButton
              deletedId={commentId}
              onDelete={onDelete}
              isOpen={isToggleOn}
              onChangeToggle={onChangeToggle}
            />
          )}
        </div>
      </div>
      <p className="text-[16px]">{content}</p>
    </div>
  )
}
export default Comment
