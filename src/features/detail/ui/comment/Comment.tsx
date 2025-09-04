import { useEffect, useRef, useState } from 'react'
import ToggleMoreButton from '../ToggleMoreButton'

interface Props {
  commentId: string
  content: string
  userId: string
  writer: string
  isMine: boolean
  created_at: string
  isOpen: boolean
  onToggle: () => void
  onDelete: (itemId: string) => Promise<void>
  onEdit: (commentId: string, userId: string, content: string) => Promise<void>
}

function Comment({
  content,
  writer,
  isMine,
  created_at,
  commentId,
  userId,
  isOpen,
  onToggle,
  onEdit,
  onDelete
}: Props) {
  const [isEdit, setIsEdit] = useState(false)
  const [text, setText] = useState(content)
  const toggleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target as Node)
      ) {
        onToggle()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onToggle])

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      if (e.shiftKey) return
      e.preventDefault()
      e.stopPropagation()
      onSubmit()
    }
  }

  const onSubmit = async () => {
    setIsEdit(false)
    await onEdit(commentId, userId, text)
  }

  return (
    <div className="border-b-2 border-neutral-light  py-2">
      <div className="flex justify-between mb-2.5">
        <span className="flex-1 text-size-md text-neutral-dark">{writer}</span>
        <span className="text-size-sm text-neutral-DEFAULT">{created_at}</span>
        <div className="w-5">
          {isMine && (
            <div ref={toggleRef}>
              <ToggleMoreButton
                label="댓글"
                deletedId={commentId}
                onEdit={() => setIsEdit(true)}
                onDelete={onDelete}
                isOpen={isOpen}
                onChangeToggle={onToggle}
              />
            </div>
          )}
        </div>
      </div>

      {isEdit ? (
        <>
          <textarea
            value={text}
            className="w-full h-20 resize-none border-2 rounded-sm border-neutral-light"
            onChange={e => setText(e.target.value)}
            onKeyDown={onKeyDown}
            autoFocus
          />
          <div className="flex justify-end ">
            <button
              type="button"
              className=" px-2.5 py-0.5 rounded-md bg-neutral-light hover:bg-neutral-DEFAULT"
              onClick={onSubmit}>
              수정
            </button>
          </div>
        </>
      ) : (
        <div className="w-full whitespace-pre-wrap break-words">{text}</div>
      )}
    </div>
  )
}
export default Comment
