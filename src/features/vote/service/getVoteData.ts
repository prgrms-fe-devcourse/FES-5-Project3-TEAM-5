import supabase from '@/supabase/supabase'

export async function getVoteData() {
  const { data, error } = await supabase.from('votes').select(
    `*,
        vote_options(*),
        vote_selections(*)
        `
  )
  if (error) {
    alert(error)
  }
  return data
}
