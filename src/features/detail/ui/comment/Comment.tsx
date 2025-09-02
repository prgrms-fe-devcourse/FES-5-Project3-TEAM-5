import { getCreateFormatDate } from '../../utils/dateFormat'
import ToggleMoreButton from '../ToggleMoreButton'
interface Props {
  isCommentToggleOn: boolean
  onChangeCommentToggle: () => void
  content: string
  writer: string
  created_at: string
}

function Comment({
  isCommentToggleOn,
  onChangeCommentToggle,
  content,
  writer,
  created_at
}: Props) {
  const createdDate = getCreateFormatDate(created_at)
  return (
    <div
      className="border-b-2 border-neutral-light  py-2.5"
      onClick={onChangeCommentToggle}>
      <div className="flex justify-between mb-2.5">
        <span className="flex-1 text-size-md text-neutral-dark">{writer}</span>
        <span className="text-size-sm text-neutral-DEFAULT">{createdDate}</span>
        <ToggleMoreButton
          isOpen={isCommentToggleOn}
          onChangeToggle={onChangeCommentToggle}
        />
      </div>
      <p className="text-[16px]">{content}</p>
    </div>
  )
}
export default Comment
