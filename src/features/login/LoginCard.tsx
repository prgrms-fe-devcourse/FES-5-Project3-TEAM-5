import { tw } from '@/shared/utils/tw'
import supabase from '@/supabase/supabase'
import type React from 'react'

interface Props {
  iconSrc: string
  text: '구글' | '카카오'
  provider: 'google' | 'kakao'
  className?: string
}

function LoginCard({ iconSrc, text, provider, className }: Props) {
  const handleLoginWithProvider = async (
    e: React.PointerEvent<HTMLButtonElement>,
    provider: 'google' | 'kakao'
  ) => {
    e.preventDefault()

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: import.meta.env.VITE_REDIRECT_URL,
          skipBrowserRedirect: false
        }
      })
      localStorage.setItem('just-logged-in', 'true')
      if (error) throw error
    } catch (error) {
      if (error instanceof Error) {
        console.error('Login failed:', error.message)
      }
    }
  }

  return (
    <button
      type="button"
      onPointerDown={e => handleLoginWithProvider(e, provider)}
      className={tw(
        'flex h-[40px] gap-3 items-center px-3 py-1 rounded-[8px] hover:bg-gray-200 duration-100 ease-in-out cursor-pointer',
        className
      )}>
      <div>
        <img
          src={iconSrc}
          alt={`${text} 아이콘`}
        />
      </div>
      <div>{text} 로그인</div>
    </button>
  )
}

export default LoginCard
