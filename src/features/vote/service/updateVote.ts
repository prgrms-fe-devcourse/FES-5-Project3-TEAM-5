import supabase from '@/supabase/supabase'

export async function getUserVoteData(vote_id: string) {
  const { data, error } = await supabase
    .from('votes')
    .select(
      `
      *,
      vote_options(*)
    `
    )
    .eq('id', vote_id)
  if (error) {
    console.error(`데이터 불러오기 실패: ${error.message}`)
  }
  return data
}

interface UpdateVoteParams {
  voteId: string
  title: string
  options: { id: string; content: string }[]
}

export async function updateVote({ voteId, title, options }: UpdateVoteParams) {
  const { data: updatedVote, error: voteError } = await supabase
    .from('votes')
    .update({ title })
    .eq('id', voteId)
    .select()
    .single()

  if (voteError) throw voteError
  if (!updatedVote) throw new Error('투표 수정 실패')

  for (const opt of options) {
    const { error } = await supabase
      .from('vote_options')
      .update({ content: opt.content })
      .eq('id', opt.id)
      .eq('vote_id', voteId)
    if (error) throw error
  }

  return { vote: updatedVote }
}
