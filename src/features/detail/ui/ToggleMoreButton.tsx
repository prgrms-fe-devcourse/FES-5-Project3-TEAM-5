import toggleMoreIcon from '@/shared/assets/icons/toggleMore.svg'

interface Props {
  isOpen: boolean
  onChangeToggle: () => void
}
function ToggleMoreButton({ isOpen, onChangeToggle }: Props) {
  const handleToggle = () => {
    onChangeToggle()
  }

  return (
    <div
      className="relative"
      onClick={handleToggle}>
      {isOpen && (
        <div className="absolute right-0 top-5 w-25  shadow-md rounded-md bg-white text-center border-0.5 cursor-pointer">
          <button className="rounded-t-md  w-full p-2 hover:translate-y-0.5 hover:bg-neutral-light hover:font-bold text-black text-size-md">
            수정하기
          </button>
          <button className="rounded-b-md w-full p-2 hover:translate-y-0.5 hover:bg-neutral-light hover:font-bold text-red-600 text-size-md">
            삭제하기
          </button>
        </div>
      )}
      <img
        src={toggleMoreIcon}
        alt=""
      />
    </div>
  )
}
export default ToggleMoreButton
