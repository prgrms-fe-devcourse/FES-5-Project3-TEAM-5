import { useUserStore } from '@/shared/stores/useUserStore'
import { formatPriceNumber } from '@/shared/utils/format'
import { tw } from '@/shared/utils/tw'
import supabase from '@/supabase/supabase'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/shallow'

interface Props {
  type: '수입' | '지출'
  className?: string
}

function ThisMonthCard({ type, className }: Props) {
  const user = useUserStore(useShallow(state => state.user))
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchThisMonthTotal = async () => {
      if (!user?.id) return
      console.log(user?.id)

      const { data: groupData, error: groupError } = await supabase
        .from('groups')
        .select('id')
        .eq('user_id', user.id)
        .eq('is_main', true)
        .single()

      if (groupError || !groupData) {
        console.error('대표 그룹 가져오기 실패:', groupError)
        return
      }
      console.log(groupData)

      const groupId = groupData.id

      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      console.log(start, end)

      const { data: itemData, error: itemError } = await supabase
        .from('account_items')
        .select('amount')
        .eq('group_id', groupId)
        .eq('type', type === '수입' ? 'income' : 'expense')
        .gte('date', start)
        .lte('date', end)
      console.log(itemData)

      if (itemError) {
        console.error('account_items 가져오기 실패:', itemError)
        return
      }

      const sum = itemData?.reduce((acc, cur) => acc + cur.amount, 0) || 0
      setTotal(sum)
    }
    fetchThisMonthTotal()
  }, [user?.id, type])

  const formatShortAmount = (amount: number): string => {
    const absAmount = Math.abs(amount)

    if (absAmount >= 1_0000_0000) {
      const result = amount / 1_0000_0000
      return `${Number.isInteger(result) ? result.toFixed(0) : result.toFixed(1)}억`
    } else if (absAmount >= 10_0000) {
      const result = amount / 1_0000
      return `${Number.isInteger(result) ? result.toFixed(0) : result.toFixed(1)}만`
    } else {
      return formatPriceNumber(amount)
    }
  }

  const formatted = formatShortAmount(total)

  const dynamicFontSize = (formatted: string) => {
    const len = formatted.length
    if (len > 10) return 'text-sm'
    if (len > 7) return 'text-md'
    return 'text-lg'
  }

  return (
    <div className="bg-white flex flex-col justify-center items-center px-6 py-3 rounded-lg w-40 max-w-40  h-20 max-h-20 flex-wrap">
      <h3 className="text-md font-light">이번 달 {type}</h3>
      <p
        className={tw(
          ' text-lg text-center break-words max-w-full leading-tight ',
          className,
          dynamicFontSize(formatted)
        )}>
        {type === '수입' ? '+' : '-'}
        {formatted}
      </p>
    </div>
  )
}

export default ThisMonthCard
