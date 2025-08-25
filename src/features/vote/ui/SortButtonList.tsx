import ButtonLayout from './ButtonLayout'

function SortButtonList() {
  return (
    <div className="flex gap-x-4">
      <ButtonLayout text="전체" />
      <ButtonLayout text="내 투표" />
      <ButtonLayout text="HOT" />
      <ButtonLayout text="종료임박" />
    </div>
  )
}
export default SortButtonList
