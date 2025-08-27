import type { VoteSelections } from '../model/type'

export function countParticipants(
  vote_id: string,
  selections?: VoteSelections[]
) {
  if (!selections) return 0

  return selections.filter(selection => selection.vote_id === vote_id).length
}
