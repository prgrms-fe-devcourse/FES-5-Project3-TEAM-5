import supabase from '@/supabase/supabase'

export async function deleteAccountItem(id: string) {
  const { error } = await supabase
    .from('account_items')
    .delete()
    .eq('id', id)

  if (error) throw error
}