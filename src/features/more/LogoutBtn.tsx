import { useSnackbarStore } from '@/shared/stores/useSnackbarStore'
import { useUserStore } from '@/shared/stores/useUserStore'

function LogoutBtn() {
  const logout = useUserStore(state => state.logout)
  const showSnackbar = useSnackbarStore(state => state.showSnackbar)

  const handleLogout = async () => {
    await logout()
    showSnackbar({ text: '로그아웃 되었습니다', type: 'success' })
  }

  return (
    <button
      type="button"
      aria-label="로그아웃"
      onClick={handleLogout}
      className="cursor-pointer">
      로그아웃
    </button>
  )
}

export default LogoutBtn
