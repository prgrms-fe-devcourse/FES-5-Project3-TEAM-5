import supabase from '@/supabase/supabase'
import type { EditCommentTable } from '../model/requestBody'

export async function updateComment(request: EditCommentTable) {
  const { error } = await supabase
    .from('comments')
    .update(request)
    .eq('id', request.id)
    .select()
    .single()

  if (error) throw new Error('댓글 수정 실패')
}
