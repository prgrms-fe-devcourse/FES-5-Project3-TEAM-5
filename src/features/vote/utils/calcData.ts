import type { VoteSelections } from '../model/responseBody'

export function countParticipants(
  vote_id: string,
  selections?: VoteSelections[]
) {
  if (!selections) return 0

  return selections.filter(selection => selection.vote_id === vote_id).length
}

export const calculateHoursDiff = (start: string, end: string) => {
  const diffMs = new Date(end).getTime() - new Date(start).getTime()
  return Math.floor(diffMs / (1000 * 60 * 60))
}
