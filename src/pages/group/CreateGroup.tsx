import CreateBtn from '@/features/group/create/CreateBtn'
import GroupName from '@/features/group/create/GroupName'
import { useInitialIsMain } from '@/features/group/create/hook/useInitialIsMain'
import Invite from '@/features/group/create/Invite'
import Mascot from '@/features/group/create/Mascot'
import Toggle from '@/features/group/create/Toggle'
import type { Users } from '@/features/group/create/type/type'
import Loading from '@/shared/components/loading/Loading'
import { useSnackbarStore } from '@/shared/stores/useSnackbarStore'
import { useUserStore } from '@/shared/stores/useUserStore'
import supabase from '@/supabase/supabase'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

function CreateGroup() {
  const [groupName, setGroupName] = useState('')
  const [mascot, setMascot] = useState<number | null>(null)
  const [isMain, setIsMain] = useState<boolean | null>(null)
  const [isGroup, setIsGroup] = useState(true)
  const [invitedUsers, setInvitedUsers] = useState<Users[]>([])

  const groupIdRef = useRef(crypto.randomUUID())

  const initialIsMain = useInitialIsMain()

  const user = useUserStore(state => state.user)
  const showSnackbar = useSnackbarStore(state => state.showSnackbar)

  const navigate = useNavigate()

  useEffect(() => {
    if (initialIsMain !== null) {
      setIsMain(initialIsMain)
    }
  }, [initialIsMain])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return

    try {
      const formData = {
        groupId: groupIdRef.current,
        groupName,
        mascot,
        isMain,
        isGroup,
        invitedUsers
      }

      console.log('폼 데이터:', formData)

      if (!groupName || mascot === null || isMain === null || !user) {
        showSnackbar({ text: '모든 필드를 입력해주세요', type: 'error' })
        return
      }

      if (isMain) {
        await supabase
          .from('groups')
          .update({ is_main: false })
          .eq('user_id', user.id)
          .eq('is_main', true)
      }

      const { error: groupError } = await supabase
        .from('groups')
        .insert({
          id: groupIdRef.current,
          name: groupName,
          mascot,
          user_id: user.id,
          is_main: isMain,
          is_group: isGroup
        })
        .select()
        .single()

      if (groupError) throw groupError

      if (!isGroup && invitedUsers.length > 0) {
        const membersToInsert = invitedUsers.map(user => ({
          group_id: groupIdRef.current,
          user_id: user.id
        }))

        const { error: memberError } = await supabase
          .from('group_members')
          .insert(membersToInsert)

        if (memberError) throw memberError
      }
      navigate('/')

      showSnackbar({ text: '새 가계부 생성 완료!', type: 'success' })
    } catch (error) {
      console.error('폼 제출 중 오류 발생:', error)
    }

    setGroupName('')
    setMascot(null)
    setIsMain(null)
    setIsGroup(true)
    setInvitedUsers([])
  }

  return (
    <div>
      {isMain === null ? (
        <Loading />
      ) : (
        <form
          className="p-4 flex flex-col gap-7"
          onSubmit={handleSubmit}>
          <GroupName
            value={groupName}
            onChange={setGroupName}
          />
          <Mascot
            value={mascot}
            onChange={setMascot}
          />
          <Toggle
            header="대표 가계부 설정"
            btn1="네"
            btn2="아니오"
            name="mainToggle"
            value={isMain}
            onChange={setIsMain}
          />
          <Toggle
            header="가계부 설정"
            btn1="개인"
            btn2="그룹"
            name="groupToggle"
            value={isGroup}
            onChange={setIsGroup}
            className={`${isGroup && 'mb-28'}`}
          />
          {!isGroup && (
            <Invite
              groupId={groupIdRef.current}
              selectedUserList={invitedUsers}
              setSelectedUserList={setInvitedUsers}
            />
          )}
          <CreateBtn />
        </form>
      )}
    </div>
  )
}

export default CreateGroup
