export interface VotesTable {
  title: string
  is_active: boolean
  starts_at: string
  ends_at: string
  user_id: string
}

export interface VoteOptionsTable {
  vote_id: string
  content: string
}

export interface VoteTime {
  starts_at: string
  ends_at: string
}
