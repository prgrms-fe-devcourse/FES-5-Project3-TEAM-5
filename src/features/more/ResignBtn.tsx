import ConfirmModal from '@/shared/components/modal/ConfirmModal'
import { useUserStore } from '@/shared/stores/useUserStore'
import { useState } from 'react'
import { useShallow } from 'zustand/shallow'
import { useStorageGroup } from '../group/model/useStorageGroup'
import { useSnackbarStore } from '@/shared/stores/useSnackbarStore'

function ResignBtn() {
  const [isOpen, setIsOpen] = useState(false)

  const { user, logout } = useUserStore(
    useShallow(state => ({ user: state.user, logout: state.logout }))
  )
  const showSnackbar = useSnackbarStore(state => state.showSnackbar)
  const clearStorageGroup = useStorageGroup(state => state.clearStorageGroup)

  const handleResignModal = () => {
    setIsOpen(true)
  }

  const getAccessTokenFromStorage = (): string | null => {
    const raw = localStorage.getItem('sb-wxkbepmrtbryptydvlrd-auth-token') // 이 키는 프로젝트에 따라 다름!
    if (!raw) return null

    try {
      const { access_token } = JSON.parse(raw)
      return access_token
    } catch {
      return null
    }
  }

  const handleResignUser = async () => {
    if (!user?.id) return

    try {
      const res = await fetch(
        'https://wxkbepmrtbryptydvlrd.supabase.co/functions/v1/delete-user',
        {
          // 실제 배포한 함수 URL로 변경
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAccessTokenFromStorage()}`
          },
          body: JSON.stringify({ userId: user.id })
        }
      )

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || '회원 탈퇴 실패')
      }

      setIsOpen(false)
      await logout()
      clearStorageGroup()
      showSnackbar({ text: '회원 탈퇴가 완료되었습니다', type: 'success' })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <button
        className="cursor-pointer hover:text-neutral-dark transition ease-in-out"
        onClick={handleResignModal}>
        회원탈퇴
      </button>
      <ConfirmModal
        open={isOpen}
        title="회원탈퇴"
        lines={['탈퇴 후에는 복구가 어려워요.', '그래도 진행하시겠습니까?']}
        onConfirm={handleResignUser}
        onCancel={() => {
          setIsOpen(false)
        }}
        confirmText="확인"
        cancelText="취소"
      />
    </>
  )
}

export default ResignBtn
