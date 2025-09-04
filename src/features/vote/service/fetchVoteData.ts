import supabase from '@/supabase/supabase'
import type { TotalVote } from '@/features/vote/model/responseBody'
import { getDeadline } from '../utils/Date'
import { countParticipants } from '../utils/calcData'

async function getTotalVoteData() {
  const { data, error } = await supabase.from('votes').select(
    `id, title, starts_at, ends_at, is_active, user_id, created_at,
     vote_options:vote_options!vote_options_vote_id_fkey(id, vote_id, content),
     vote_selections:vote_selections!vote_selections_vote_id_fkey(id, vote_id, user_id, option_id, created_at),
     my_select:vote_selections!vote_selections_vote_id_fkey(id, vote_id, option_id, user_id,created_at)`
  )
  if (error) {
    console.error(`데이터 불러오기 실패: ${error.message}`)
    return []
  }
  return data ?? []
}

export async function fetchVoteData(userId: string): Promise<TotalVote[]> {
  const response = await getTotalVoteData()

  const data = await Promise.all(
    response!.map(async vote => {
      return {
        ...vote,
        vote_summary: {
          participants: countParticipants(vote.id, vote.vote_selections),
          deadline: getDeadline(vote.ends_at),
          isOwner: vote.user_id === userId
        }
      }
    })
  )

  return data
}
