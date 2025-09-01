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
        <div className="absolute right-0 top-5 w-20 p-2.5 shadow-md rounded-md bg-white text-center border-0.5 cursor-pointer">
          <p className="mb-1.5 hover:translate-0.5 hover:font-bold text-black text-size-md">
            수정하기
          </p>
          <p className=" hover:translate-0.5 hover:font-bold text-red-600 text-size-md">
            삭제하기
          </p>
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
