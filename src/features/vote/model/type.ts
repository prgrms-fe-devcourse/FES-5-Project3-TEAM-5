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

export interface Vote {
  created_at: string
  ends_at: string
  id: string
  is_active: boolean
  starts_at: string
  title: string
  user_id?: string
  vote_options: VoteOptions[]
  vote_selections?: VoteSelections[]
}
