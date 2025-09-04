import supabase from '@/supabase/supabase'
import type { GroupMembers, Users } from '../type/type'

type GenerateGroupMemberInsertsParams = {
  groupId: string
  userId: string
  invitedUsers: Users[]
  isPersonal: boolean
  isMain: boolean
}


export async function getUserGroups(userId: string): Promise<GroupMembers[]> {
  try {
    const { data, error } = await supabase
      .from('group_members')
      .select('group_id, is_main, groups (*)') // FK join
      .eq('user_id', userId)

    if (error) {
      console.error('그룹 조회 실패:', error)
      return []
    }

    if (!data) return []

    const result: GroupMembers[] = data.map((item): GroupMembers => {
      return {
        group_id: item.group_id,
        is_main: item.is_main,
        // groups가 배열이면 첫 요소 추출, 아니면 그대로 사용
        groups: Array.isArray(item.groups)
          ? item.groups[0]
          : (item.groups ?? null)
      }
    })

    // Map the data to match GroupMembers type
    return result
  } catch (err) {
    console.error('그룹 불러오기 실패:', err)
    return []
  }
}

export const updateGroupInfo = async (
  groupId: string,
  name: string,
  mascot: number
) => {
  const { error } = await supabase
    .from('groups')
    .update({ name, mascot })
    .eq('id', groupId)

  if (error) {
    throw new Error('그룹 정보 수정 실패: ' + error.message)
  }
}

export const updateMainStatus = async (groupId: string, userId: string) => {
  // Step 1. 모든 그룹 is_main false로 초기화
  const { error: resetError } = await supabase
    .from('group_members')
    .update({ is_main: false })
    .eq('user_id', userId)

  if (resetError) {
    throw new Error('대표 가계부 초기화 실패: ' + resetError.message)
  }

  // Step 2. 선택한 그룹만 true로 설정
  const { error: setMainError } = await supabase
    .from('group_members')
    .update({ is_main: true })
    .eq('user_id', userId)
    .eq('group_id', groupId)

  if (setMainError) {
    throw new Error('대표 가계부 설정 실패: ' + setMainError.message)
  }
}

export const generateGroupMemberInserts = async ({
  groupId,
  userId,
  invitedUsers,
  isPersonal,
  isMain,
  includeBaseMember = true
}: GenerateGroupMemberInsertsParams & { includeBaseMember?: boolean }) => {
  const baseMember = {
    group_id: groupId,
    user_id: userId,
    is_main: isMain
  }

  if (isPersonal) {
    return [baseMember]
  }

  // 초대한 유저 중 이미 대표 가계부 있는지 검사
  const invitedUserIds = invitedUsers.map(u => u.id)

  const { data: mainUsers, error } = await supabase
    .from('group_members')
    .select('user_id')
    .in('user_id', invitedUserIds)
    .eq('is_main', true)

  if (error) {
    console.error('대표 가계부 검사 실패', error)
     return includeBaseMember ? [baseMember] : []
  }

  const hasMain = new Set(mainUsers.map(m => m.user_id))

  const invitedInserts = invitedUsers.map(user => ({
    group_id: groupId,
    user_id: user.id,
    is_main: !hasMain.has(user.id) // 대표 가계부 없으면 true
  }))

  return includeBaseMember ? [baseMember, ...invitedInserts] : invitedInserts
}