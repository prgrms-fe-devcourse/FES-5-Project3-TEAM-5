import { useUserStore } from '@/shared/stores/useUserStore'

function LogoutBtn() {
  const { logout } = useUserStore()

  return (
    <button
      type="button"
      aria-label="로그아웃"
      onClick={() => {
        logout()
      }}
      className="cursor-pointer">
      로그아웃
    </button>
  )
}

export default LogoutBtn
