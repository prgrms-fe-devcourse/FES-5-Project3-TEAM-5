import supabase from '@/supabase/supabase'
import type { GroupMembers } from '../type/type'

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
