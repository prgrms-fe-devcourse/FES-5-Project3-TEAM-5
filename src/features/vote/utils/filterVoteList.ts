import type { TotalVote } from '../model/responseBody'

export function filterMyVote(selections?: TotalVote[], userId?: string) {
  if (!selections || !userId) return []

  return selections.filter(selection => selection.user_id === userId)
}

function removeOverVote(selections: TotalVote[]) {
  return selections.filter(
    vote => vote.vote_summary!.deadline.text !== '투표 마감'
  )
}

export function sortByParticipantsDesc(selections?: TotalVote[]) {
  if (!selections) return []
  return removeOverVote(
    selections.sort(
      (a, b) => b.vote_summary!.participants - a.vote_summary!.participants
    )
  )
}
export function sortByDeadlineAsc(selections?: TotalVote[]) {
  if (!selections) return []
  const voteList = removeOverVote(selections)

  return [...voteList].sort((a, b) => {
    const aDeadline = a.vote_summary!.deadline
    const bDeadline = b.vote_summary!.deadline
    return aDeadline.value - bDeadline.value
  })
}

export function sortByDeadlineDesc(selections?: TotalVote[]) {
  if (!selections) return []

  return [...selections].sort((a, b) => {
    const aDeadline = a.vote_summary!.deadline
    const bDeadline = b.vote_summary!.deadline

    if (aDeadline.text === '투표 마감' && bDeadline.text !== '투표 마감') {
      return 1
    }

    if (aDeadline.text !== '투표 마감' && bDeadline.text === '투표 마감') {
      return -1
    }

    return bDeadline.value - aDeadline.value
  })
}
