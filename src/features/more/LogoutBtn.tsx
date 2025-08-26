import { useUserStore } from '@/shared/stores/useUserStore'
import { useNavigate } from 'react-router'

function LogoutBtn() {
  const { logout } = useUserStore()

  return (
    <button
      type="button"
      aria-label="로그아웃"
      onClick={() => {
        logout()
      }}
      className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
      로그아웃
    </button>
  )
}

export default LogoutBtn
