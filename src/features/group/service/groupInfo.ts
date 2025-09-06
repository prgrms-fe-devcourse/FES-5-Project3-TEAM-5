import supabase from '@/supabase/supabase'

export const fetchGroupInfo = async (groupId: string) => {
  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .eq('id', groupId)
    .single()

  if (error) {
    throw new Error('그룹 정보 불러오기 실패: ' + error.message)
  }

  return data
}

export const validateGroupMember = async (userId: string, groupId: string) => {
  const { data, error } = await supabase
    .from('group_members')
    .select('*')
    .eq('user_id', userId)
    .eq('group_id', groupId)
    .single()

  if (error) {
    return false
  }

  return data ? true : false
}
