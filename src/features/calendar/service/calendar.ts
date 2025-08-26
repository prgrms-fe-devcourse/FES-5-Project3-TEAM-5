import supabase from '@/supabase/supabase'

import dayjs from 'dayjs'

export const fetchCalendar = async (month: number) => {
  const startDate = dayjs().month(month).startOf('month').format('YYYY-MM-DD')
  const endDate = dayjs().month(month).endOf('month').format('YYYY-MM-DD')

  const { data, error } = await supabase
    .from('account_items')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate)

  if (error) throw error
  return data
}
