import ToggleMoreButton from '../ToggleMoreButton'
interface Props {
  isCommentToggleOn: boolean
  onChangeCommentToggle: () => void
}

function Comment({ isCommentToggleOn, onChangeCommentToggle }: Props) {
  return (
    <div
      className="border-b-2 border-neutral-light  py-2.5"
      onClick={onChangeCommentToggle}>
      <div className="flex justify-between mb-2.5">
        <span className="text-size-md text-neutral-dark">작성자 이름</span>
        <ToggleMoreButton
          isOpen={isCommentToggleOn}
          onChangeToggle={onChangeCommentToggle}
        />
      </div>
      <p className="text-[16px]">
        돈 그렇게 쓰는거 아닌데....어쩌구 저쩌구
        뭐시기asfsaf뭐시기ㄴ머로ㅓㅏ모러ㅏㅗㅇ너ㅓㅏㅁ남
      </p>
    </div>
  )
}
export default Comment
