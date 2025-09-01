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
