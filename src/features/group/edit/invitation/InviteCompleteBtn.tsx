import SubmitButton from '@/shared/components/form/SubmitButton'
import type { Users } from '../../create/type/type'
import supabase from '@/supabase/supabase'
import type { User } from '@supabase/supabase-js'
import { useNavigate } from 'react-router'
import { useSnackbarStore } from '@/shared/stores/useSnackbarStore'

interface Props {
  personal: boolean
  invitedUsers: Users[]
  groupId: string | undefined
  user: User | null
}

function InviteCompleteBtn({ personal, invitedUsers, groupId, user }: Props) {
  const navigate = useNavigate()
  const showSnackbar = useSnackbarStore(state => state.showSnackbar)

  const handleInviteComplete = async () => {
    if (!groupId || !user?.id) {
      console.error('유효하지 않은 groupId 또는 user 정보')
      return
    }

    // 개인 → 공동 전환
    if (personal) {
      const { error: updateError } = await supabase
        .from('groups')
        .update({ is_personal: false })
        .eq('id', groupId)
        .eq('user_id', user.id)

      if (updateError) {
        console.error('가계부 공동 전환 실패:', updateError)
        return
      }
    }

    const invitedUserIds = invitedUsers.map(u => u.id)

    const { data: existingMembers, error: fetchError } = await supabase
      .from('group_members')
      .select('user_id')
      .eq('group_id', groupId)
      .in('user_id', invitedUserIds)

    if (fetchError) {
      console.error('기존 그룹 멤버 조회 실패:', fetchError)
      return
    }

    const existingUserIds = new Set(existingMembers.map(m => m.user_id))

    const filteredUsers = invitedUsers.filter(u => !existingUserIds.has(u.id))

    if (filteredUsers.length === 0) {
      showSnackbar({
        text: '이미 초대된 유저입니다.',
        type: 'error'
      })
      return
    }

    const filteredUserIds = filteredUsers.map(u => u.id)

    const { data: mainData, error: mainError } = await supabase
      .from('group_members')
      .select('user_id')
      .in('user_id', filteredUserIds)
      .eq('is_main', true)

    if (mainError) {
      console.error('대표 가계부 확인 실패:', mainError)
      return
    }

    const hasMainSet = new Set(mainData.map(m => m.user_id))

    // Step 2: 초대한 유저들 insert
    const inserts = filteredUsers.map(u => ({
      group_id: groupId,
      user_id: u.id,
      is_main: !hasMainSet.has(u.id)
    }))

    const { error: insertError } = await supabase
      .from('group_members')
      .insert(inserts)

    if (insertError) {
      console.error('초대한 유저 추가 실패:', insertError)
      return
    }

    navigate(`/accountBook/${groupId}/settings`)
    showSnackbar({ text: '초대가 완료되었습니다!', type: 'success' })
  }

  return (
    <div>
      <SubmitButton
        text="초대 완료"
        onClick={handleInviteComplete}
      />
    </div>
  )
}

export default InviteCompleteBtn
