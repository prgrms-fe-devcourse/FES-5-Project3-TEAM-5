import { useUserStore } from '@/shared/stores/useUserStore'
import supabase from '@/supabase/supabase'

export async function deleteSelectVote(vote_id: string, userId: string) {
  const { error } = await supabase
    .from('vote_selections')
    .delete()
    .eq('vote_id', vote_id)
    .eq('user_id', userId)

  if (error) throw error
}

export async function insertSelectVote(vote_id: string, option_id: string) {
  const userId = useUserStore.getState().user?.id
  if (!userId) throw new Error('로그인 필요')
  await deleteSelectVote(vote_id, userId!)

  const { data: newVote, error: voteError } = await supabase
    .from('vote_selections')
    .insert({
      vote_id,
      option_id,
      user_id: userId
    })
    .select()

    .single()

  if (voteError) throw voteError
  if (!newVote) throw new Error('투표하기 실패')

  return newVote
}
