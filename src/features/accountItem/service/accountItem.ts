import supabase from '@/supabase/supabase'

import dayjs from 'dayjs'
import { mapDbToAccountItem } from '../lib/mappers'

// 캘린더 월 데이터 조회
export const fetchByMonth = async (month: number) => {
  const startDate = dayjs().month(month).startOf('month').format('YYYY-MM-DD')
  const endDate = dayjs().month(month).endOf('month').format('YYYY-MM-DD')

  const { data, error } = await supabase
    .from('account_items')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate)

  if (error) throw error
  return (data ?? []).map(mapDbToAccountItem)
}

// 캘린더 일 데이터 조회
export const fetchByDate = async (date: Date) => {
  const start = dayjs(date).startOf('day').toISOString()
  const end = dayjs(date).endOf('day').toISOString()

  const { data, error } = await supabase
    .from('account_items')
    .select('*')
    .gte('date', start)
    .lte('date', end)

  if (error) throw error
  return (data ?? []).map(mapDbToAccountItem)
}
