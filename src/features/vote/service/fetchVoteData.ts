import supabase from '@/supabase/supabase'
import type { Vote } from '@/features/vote/model/type'
import { getDeadline } from '../utils/Date'
import { countParticipants } from '../utils/filter'
import { useUserStore } from '@/shared/stores/useUserStore'

async function getVoteData() {
  const { data, error } = await supabase.from('votes').select(
    `*,
        vote_options(*),
        vote_selections(*)
        `
  )
  if (error) {
    alert(error)
  }
  return data
}

export async function fetchVoteData(): Promise<Vote[]> {
  const response = await getVoteData()
  const userId = useUserStore.getState().user?.id
  const data: Vote[] = response!.map(vote => ({
    ...vote,
    vote_summary: {
      participant: countParticipants(vote.id, vote.vote_selections),
      deadline: getDeadline(vote.ends_at),
      isOwner: vote.user_id === userId
    }
  }))

  return data
}
