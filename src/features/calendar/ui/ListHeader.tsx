export const ListHeader = () => {
  return (
    <div className="w-full p-2.5 flex justify-between items-center text-size-md border-b border-neutral-base">
      <div className="w-[52px] flex flex-col items-center gap-1 text-size-sm">
        <div className="text-size-xl">25</div>
        <div className="px-2.5 py-0.5 bg-neutral-light rounded-lg">금요일</div>
      </div>
      <div className="flex gap-2.5">
        <div>123,123,123원</div>
        <div>123,123,123원</div>
      </div>
    </div>
  )
}
