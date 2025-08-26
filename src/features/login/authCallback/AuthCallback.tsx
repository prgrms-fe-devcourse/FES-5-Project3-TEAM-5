import { useUserStore } from '@/shared/stores/useUserStore'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

function AuthCallback() {
  const { isAuth, isLoading } = useUserStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading) {
      if (isAuth) {
        console.log('로그인 성공')
        navigate('/')
      } else {
        console.log('로그인 실패')
        navigate('/login')
      }
    }
  })

  return <div>로그인 중입니다...</div>
}

export default AuthCallback
