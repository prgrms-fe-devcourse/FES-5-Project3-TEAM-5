// 댓글 추가

import supabase from '@/supabase/supabase'
import type { CommentTable } from '../model/requestBody'

export async function insertComment(request: CommentTable) {
  const { error } = await supabase.from('comments').insert(request)
  if (error) throw new Error('댓글 업로드 실패')
}
