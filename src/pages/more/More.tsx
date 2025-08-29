import LogoutBtn from '@/features/more/LogoutBtn'
import NicknameCard from '@/features/more/NicknameCard'
import { useNavigate } from 'react-router'

function More() {
  const nav = useNavigate()
  return (
    <div className="flex flex-col gap-4 bg-[#F5F5F5] py-3 h-screen">
      <div className="mx-2 mt-15">
        <NicknameCard />
      </div>
      <div className="flex flex-col gap-4 px-4 py-6 bg-white rounded-xl mx-2">
        <h2 className="text-neutral-dark">또모 서비스</h2>
        <ul className="flex flex-col gap-4">
          {['공지사항', 'FAQ', '개인정보처리방침'].map((text, i) => (
            <li
              key={i}
              className="group">
              <button
                className="group-hover:text-neutral-dark transition ease-in-out  cursor-pointer"
                onClick={() => {
                  if (text === '공지사항') {
                    nav('notice')
                  } else if (text === 'FAQ') {
                    nav('faq')
                  } else if (text === '개인정보처리방침') {
                    nav('privacy')
                  }
                }}>
                {text}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4 px-4 py-6 bg-white rounded-xl mx-2">
        <h2 className="text-neutral-dark">계정관리</h2>
        <ul className="flex flex-col gap-4">
          <li className="hover:text-neutral-dark transition ease-in-out">
            <button className="cursor-pointer">회원탈퇴</button>
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
