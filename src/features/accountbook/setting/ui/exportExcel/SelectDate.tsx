import calenderIcon from '@/shared/assets/icons/calendar.svg'
interface Props {
  openCalender: () => void
}
function SelectDate({ openCalender }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="flex gap-2.5 items-center"
        onClick={openCalender}>
        <img
          src={calenderIcon}
          alt="calender icon"
          style={{ width: '24px' }}
        />
        <p className="text-neutral-dark text-lg text-center pt-1">날짜 선택</p>
      </div>
      <p className="text-neutral-dark">
        한 달 간의 데이터를 엑셀로 내보낼 수 있어요
      </p>
    </div>
  )
}
export default SelectDate
