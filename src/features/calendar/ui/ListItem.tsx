export const ListItem = () => {
  return (
    <div className="w-full border-b border-neutral-light p-2.5 flex justify-between">
      <div className="flex items-center gap-2.5 text-size-md">
        <div className="w-[30px] h-[30px] rounded-full bg-gray-50"></div>
        <div>월급소득</div>
      </div>
      <div>+123,234,123원</div>
    </div>
  )
}
