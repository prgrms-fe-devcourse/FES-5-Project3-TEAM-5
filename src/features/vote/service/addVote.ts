import supabase from '@/supabase/supabase'
import type { VotesTable, VoteOptionsTable } from '../model/requestBody'

export async function addVote(vote: VotesTable, options: string[]) {
  const { data: newVote, error: voteError } = await supabase
    .from('votes')
    .insert(vote)
    .select()
    .single()

  if (voteError) throw voteError
  if (!newVote) throw new Error('투표 생성 실패')

  const optionRows: VoteOptionsTable[] = options.map(content => ({
    vote_id: newVote.id,
    content
  }))

  const { error: optionsError } = await supabase
    .from('vote_options')
    .insert(optionRows)

  if (optionsError) throw optionsError

  return { vote: newVote }
}
