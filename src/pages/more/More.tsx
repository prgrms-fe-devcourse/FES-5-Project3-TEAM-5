import LogoutBtn from '@/features/more/LogoutBtn'
import NicknameCard from '@/features/more/NicknameCard'

function More() {
  return (
    <div className="flex flex-col gap-4 bg-light-gray mt-2">
      <div>
        <NicknameCard />
      </div>
      <div className="flex flex-col gap-4 px-4 py-6 bg-white rounded-xl">
        <h2 className="text-neutral-dark">또모 서비스</h2>
        <ul className="flex flex-col gap-4">
          <li className="hover:text-neutral-dark transition ease-in-out">
            공지사항
          </li>
          <li className="hover:text-neutral-dark transition ease-in-out">
            FAQ
          </li>
          <li className="hover:text-neutral-dark transition ease-in-out">
            개인정보처리방침
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-4 px-4 py-6 bg-white rounded-xl">
        <h2 className="text-neutral-dark">계정관리</h2>
        <ul className="flex flex-col gap-4">
          <li className="hover:text-neutral-dark transition ease-in-out">
            회원탈퇴
          </li>
          <li className="hover:text-neutral-dark transition ease-in-out">
            <LogoutBtn />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default More
