import supabase from '@/supabase/supabase'

// 삭제
export async function deleteReaction(itemId: string, userId: string) {
  const { error } = await supabase
    .from('reactions')
    .delete()
    .eq('item_id', itemId)
    .eq('user_id', userId)
  if (error) throw error
}

// 추가
export async function insertReaction(
  itemId: string,
  userId: string,
  kind: string
) {
  await deleteReaction(itemId, userId)
  const { error } = await supabase.from('reactions').insert({
    item_id: itemId,
    user_id: userId,
    kind: kind
  })
  if (error) throw new Error('아이템 상세 조회 리액션 실패')
}
