export interface VoteOptions {
  content: string
  id: string
  vote_id: string
}

export interface VoteSelections {
  id: string
  vote_id: string
  option_id: string
  user_id: string
  created_at: string
}

export interface VoteSummary {
  participants: number
  deadline: {
    text: string
    value: number
  }
  isOwner: boolean
}
export interface MySelection {
  id: string
  vote_id: string
  option_id: string
  created_at: string
}

export interface TotalVote {
  created_at: string
  ends_at: string
  id: string
  is_active: boolean
  my_select: MySelection[]
  starts_at: string
  title: string
  vote_options: VoteOptions[]
  vote_selections?: VoteSelections[]
  vote_summary?: VoteSummary
}
