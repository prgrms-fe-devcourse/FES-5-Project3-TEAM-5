import supabase from '@/supabase/supabase'

export async function deleteComment(deletedId: string) {
  const { error } = await supabase.from('comments').delete().eq('id', deletedId)

  if (error) {
    console.error(`삭제 실패: ${error.message}`)
  }
}
