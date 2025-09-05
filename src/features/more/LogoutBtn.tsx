import { useSnackbarStore } from '@/shared/stores/useSnackbarStore'
import { useUserStore } from '@/shared/stores/useUserStore'
import { useStorageGroup } from '../group/model/useStorageGroup'

function LogoutBtn() {
  const logout = useUserStore(state => state.logout)
  const showSnackbar = useSnackbarStore(state => state.showSnackbar)
  const clearStorageGroup = useStorageGroup(state => state.clearStorageGroup)

  const handleLogout = async () => {
    await logout()
    clearStorageGroup()
    showSnackbar({ text: '로그아웃 되었습니다', type: 'success' })
  }

  return (
    <button
      type="button"
      aria-label="로그아웃"
      onClick={() => handleLogout()}
      className="cursor-pointer hover:text-neutral-dark transition ease-in-out">
      로그아웃
    </button>
  )
}

export default LogoutBtn
