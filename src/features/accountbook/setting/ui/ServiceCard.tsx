const serviceList = [
  { value: 'removeUser', text: '회원탈퇴' },
  { value: 'exportExcel', text: '엑셀 내보내기' },
  { value: 'deleteAccountBook', text: '가계부 삭제' }
]
function ServiceCard() {
  return (
    <div className="flex flex-col gap-4 px-4 py-6 bg-white rounded-xl mx-2 shadow-md ">
      <h2 className="text-neutral-dark font-bold  text-size-lg">
        가계부 서비스
      </h2>
      <ul className="flex flex-col gap-3">
        {serviceList.map(({ value, text }) => (
          <li
            key={value}
            className="hover:black  hover:font-bold transition ease-in-out">
            <button className="cursor-pointer text-size-lg">{text}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default ServiceCard
