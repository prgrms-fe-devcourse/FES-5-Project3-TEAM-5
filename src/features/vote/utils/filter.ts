import { useUserStore } from '@/shared/stores/useUserStore'
import type { Vote, VoteSelections } from '../model/type'

export function countParticipants(
  vote_id: string,
  selections?: VoteSelections[]
) {
  if (!selections) return 0
  return selections.filter(selection => selection.vote_id === vote_id).length
}

export function filterMyVote(selections?: Vote[]) {
  if (!selections) return []
  const userId = useUserStore.getState().user?.id
  return selections.filter(selection => selection.user_id === userId)
}

export function filterHotVote(selections?: Vote[]) {
  if (!selections) return []
  return selections.sort(
    (a, b) => b.vote_summary!.participant - a.vote_summary!.participant
  )
}

export function filterDeadline(selections?: Vote[]) {
  if (!selections) return []
  return selections.sort(
    (a, b) => a.vote_summary!.deadline.value - b.vote_summary!.deadline.value
  )
}
