import { useUserStore } from '@/shared/stores/useUserStore'
import supabase from '@/supabase/supabase'

export async function insertSelectVote(vote_id: string, option_id: string) {
  const userId = useUserStore.getState().user?.id
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

  return { vote: newVote }
}
