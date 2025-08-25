import { tw } from '@/shared/utils/tw'

interface Props {
  iconSrc: string
  text: string
  className?: string
}

function LoginCard({ iconSrc, text, className }: Props) {
  return (
    <div
      className={tw(
        'flex h-[40px] gap-3 items-center px-3 py-1 rounded-[8px] hover:bg-gray-200 duration-100 ease-in-out',
        className
      )}>
      <div>
        <img
          src={iconSrc}
          alt={`${text} 아이콘`}
        />
      </div>
      <div>{text} 로그인</div>
    </div>
  )
}

export default LoginCard
