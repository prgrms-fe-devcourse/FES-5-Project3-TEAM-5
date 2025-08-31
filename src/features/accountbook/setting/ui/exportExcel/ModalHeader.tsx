import cancelIcon from '@/shared/assets/icons/cancel.svg'

interface Props {
  closeModal: () => void
}

function ModalHeader({ closeModal }: Props) {
  return (
    <div className="flex justify-between relative">
      <h2 className="flex-1 text-center text-[22px] font-bold text-black">
        엑셀 내보내기
      </h2>
      <img
        onClick={closeModal}
        style={{ width: '20px' }}
        src={cancelIcon}
        alt="닫기 아이콘"
      />
    </div>
  )
}
export default ModalHeader
