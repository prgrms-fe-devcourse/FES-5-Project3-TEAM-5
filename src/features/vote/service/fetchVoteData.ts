import supabase from '@/supabase/supabase'
import type { TotalVote } from '@/features/vote/model/responseBody'
import { getDeadline } from '../utils/Date'
import { useUserStore } from '@/shared/stores/useUserStore'
import { countParticipants } from '../utils/calcData'

async function getTotalVoteData() {
  const { data, error } = await supabase.from('votes').select(
    `*,
        vote_options(*),
        vote_selections(*)
        `
  )
  if (error) {
    alert(`데이터 불러오기 실패: ${error.message}`)
  }
  return data
}

export async function fetchVoteData(): Promise<TotalVote[]> {
  const response = await getTotalVoteData()
  const userId = useUserStore.getState().user?.id
  const data: TotalVote[] = response!.map(vote => ({
    ...vote,
    vote_summary: {
      participants: countParticipants(vote.id, vote.vote_selections),
      deadline: getDeadline(vote.ends_at),
      isOwner: vote.user_id === userId
    }
  }))

  return data
}
