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
    alert(`데이터 불러오기 실패: ${error.message}`)
  }
  return data
}

// export async function fetchUserVote():Promise{

// }
