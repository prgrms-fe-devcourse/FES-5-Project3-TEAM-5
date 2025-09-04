import LogoutBtn from '@/features/more/LogoutBtn'
import NicknameCard from '@/features/more/NicknameCard'
import ResignBtn from '@/features/more/ResignBtn'
import { useState } from 'react'
import { useNavigate } from 'react-router'

function More() {
  const [activeServiceIndex, setActiveServiceIndex] = useState<number | null>(
    null
  )
  const [activeAccountIndex, setActiveAccountIndex] = useState<number | null>(
    null
  )

  const accountItems = [<ResignBtn key="resign" />, <LogoutBtn key="logout" />]

  const nav = useNavigate()
  return (
    <div className="flex flex-col gap-4 bg-white">
      <div className="mx-2 mt-8 ">
        <NicknameCard />
      </div>
      <div className="flex flex-col gap-4 px-4 py-6 bg-white rounded-xl mx-2 shadow-md ">
        <h2 className="text-neutral-dark">또모 서비스</h2>
        <ul className="flex flex-col gap-4">
          {['공지사항', 'FAQ', '개인정보처리방침'].map((text, i) => (
            <li
              key={i}
              className={`transition ease-in-out ${
                activeServiceIndex === i
                  ? 'text-neutral-dark'
                  : 'group-hover:text-neutral-dark'
              }`}
              onTouchStart={() => setActiveServiceIndex(i)}
              onTouchEnd={() => setActiveServiceIndex(null)}
              onTouchCancel={() => setActiveServiceIndex(null)}>
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
      <div className="flex flex-col gap-4 px-4 py-6 bg-white rounded-xl mx-2 shadow-md shadow-2">
        <h2 className="text-neutral-dark">계정관리</h2>
        <ul className="flex flex-col gap-4">
          {accountItems.map((item, i) => (
            <li
              key={i}
              className={`transition ease-in-out ${
                activeAccountIndex === i
                  ? 'text-neutral-dark'
                  : 'hover:text-neutral-dark'
              }`}
              onTouchStart={() => setActiveAccountIndex(i)}
              onTouchEnd={() => setActiveAccountIndex(null)}
              onTouchCancel={() => setActiveAccountIndex(null)}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default More
