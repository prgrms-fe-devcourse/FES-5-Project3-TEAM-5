import SubmitButton from '@/shared/components/form/SubmitButton'
import type { Users } from '../../create/type/type'
import supabase from '@/supabase/supabase'
import type { User } from '@supabase/supabase-js'
import { useNavigate } from 'react-router'
import { useSnackbarStore } from '@/shared/stores/useSnackbarStore'
import { generateGroupMemberInserts } from '../../create/service/fetch'

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
        text: '이미 초대된 유저입니다',
        type: 'warning'
      })
      return
    }

    //초대한 유저들 insert
    const inserts = await generateGroupMemberInserts({
      groupId,
      userId: user.id,
      invitedUsers: filteredUsers,
      isPersonal: false,
      isMain: false, // 본인은 이미 들어가 있으므로
      includeBaseMember: false
    })

    const { error: insertError } = await supabase
      .from('group_members')
      .insert(inserts)

    if (insertError) {
      console.error('초대한 유저 추가 실패:', insertError)
      return
    }

    navigate(`/accountBook/${groupId}/settings`)
    showSnackbar({ text: '초대가 완료되었습니다', type: 'success' })
  }

  return (
    <div>
      <SubmitButton
        text="초대 완료"
        onClick={handleInviteComplete}
        disabled={invitedUsers.length === 0}
      />
    </div>
  )
}

export default InviteCompleteBtn
