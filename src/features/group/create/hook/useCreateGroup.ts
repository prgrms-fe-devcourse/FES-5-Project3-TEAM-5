import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import supabase from '@/supabase/supabase'
import { useSnackbarStore } from '@/shared/stores/useSnackbarStore'
import { useUserStore } from '@/shared/stores/useUserStore'
import { useInitialIsMain } from './useInitialIsMain'
import type { Users } from '@/features/group/create/type/type'
import { generateGroupMemberInserts } from '../service/fetch'

export function useCreateGroup() {
  const [groupName, setGroupName] = useState('')
  const [mascot, setMascot] = useState<number | null>(0)
  const [isMain, setIsMain] = useState<boolean | null>(null)
  const [isPersonal, setIsPersonal] = useState(true)
  const [invitedUsers, setInvitedUsers] = useState<Users[]>([])

  const groupIdRef = useRef(crypto.randomUUID())
  const navigate = useNavigate()
  const showSnackbar = useSnackbarStore(state => state.showSnackbar)
  const user = useUserStore(state => state.user)
  const initialIsMain = useInitialIsMain()

  useEffect(() => {
    if (initialIsMain !== null && isMain === null) {
      setIsMain(initialIsMain)
    }
  }, [initialIsMain, isMain])

  const handleSubmit = async () => {
    if (!user) return

    if (isMain === null) {
      showSnackbar({ text: '잠시만 기다려주세요...', type: 'info' })
      return
    }

    const finalIsMain =
    initialIsMain ? true : isMain


    try {

      if (!groupName || mascot === null) {
        showSnackbar({ text: '모든 필드를 입력해주세요', type: 'warning' })
        return
      }

      if (!isPersonal && invitedUsers.length === 0) {
      showSnackbar({ text: '초대한 유저가 없습니다.', type: 'warning' })
      return
    }

      // 기존 대표 가계부 초기화
      if (isMain) {
        await supabase
          .from('group_members')
          .update({ is_main: false })
          .eq('user_id', user.id)
          .eq('is_main', true)
      }

      // 그룹 생성
      const { error: groupError } = await supabase
        .from('groups')
        .insert({
          id: groupIdRef.current,
          user_id: user.id,
          is_personal: isPersonal,
          mascot,
          name: groupName
        })
        .select()
        .single()

      if (groupError) throw groupError

      // 그룹 멤버 초대
      const membersToInsert = await generateGroupMemberInserts({
        groupId: groupIdRef.current,
        userId: user.id,
        invitedUsers,
        isPersonal,
        isMain: finalIsMain
      })

      const { error } = await supabase
        .from('group_members')
        .insert(membersToInsert)
      if (error) {
        console.error('초대 멤버 추가 실패:', error)
        return
      }

      showSnackbar({ text: '새 가계부 생성 완료!', type: 'success' })
      navigate('/')
    } catch (error) {
      console.error('폼 제출 중 오류 발생:', error)
    }

    // 초기화
    setGroupName('')
    setMascot(1)
    setIsMain(null)
    setIsPersonal(true)
    setInvitedUsers([])
  }

  return {
    groupName,
    setGroupName,
    mascot,
    setMascot,
    isMain,
    setIsMain,
    isPersonal,
    setIsPersonal,
    invitedUsers,
    setInvitedUsers,
    handleSubmit
  }
}
