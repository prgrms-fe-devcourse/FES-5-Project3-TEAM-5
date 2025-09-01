import supabase from '@/supabase/supabase'
import type { Group } from '../stores/useGroupStore'

export const fetchGroupsByUser = async (userId: string): Promise<Group[]> => {
  const { data, error } = await supabase
    .from('group_members')
    .select('group_id, is_main, groups(*)')
    .eq('user_id', userId)
    .returns<Group[]>()

  if (error) {
    console.error('그룹 불러오기 실패:', error)
    return []
  }

  return data || []
}
