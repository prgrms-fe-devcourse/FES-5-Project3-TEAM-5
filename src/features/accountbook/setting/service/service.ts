import supabase from '@/supabase/supabase'

export interface Group {
  id: string
  name: string
  is_personal: boolean
  mascot: number | undefined
  user_id: string
}

export const fetchGroups = async (
  groupId: string | undefined
): Promise<Group | undefined> => {
  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .eq('id', groupId)
    .single()

  if (error) {
    console.error('그룹정보 불러오기: ', error)
    return
  }

  return data as Group
}
