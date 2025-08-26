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

  const { data: items } = await supabase
    .from('account_items')
    .select('*')
    .gte('date', start)
    .lte('date', end)

  const categoryIds = [...new Set(items?.map(item => item.category_id) ?? [])]

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .in('id', categoryIds)

  const categoryMap = Object.fromEntries(
    categories?.map(c => [c.id, c.name]) ?? []
  )
  const itemsWithCategory = items?.map(item => ({
    ...item,
    categories: categoryMap[item.category_id]
  }))

  return (itemsWithCategory ?? []).map(mapDbToAccountItem)
}
