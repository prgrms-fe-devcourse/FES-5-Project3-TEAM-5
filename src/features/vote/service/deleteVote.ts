import supabase from '@/supabase/supabase'

export async function deleteVote(id: string) {
  const { error } = await supabase.from('votes').delete().eq('id', id)
  if (error) {
    console.error(`투표 삭제 실패: ${error.message}`)
  }
}
