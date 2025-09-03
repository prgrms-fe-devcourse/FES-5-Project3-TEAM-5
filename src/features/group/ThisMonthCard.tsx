import { useUserStore } from '@/shared/stores/useUserStore'
import { formatPriceNumber } from '@/shared/utils/format'
import { tw } from '@/shared/utils/tw'
import supabase from '@/supabase/supabase'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/shallow'
import { useSpring, animated } from '@react-spring/web'

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

      const { data: groupData, error: groupError } = await supabase
        .from('group_members')
        .select('group_id')
        .eq('user_id', user.id)
        .eq('is_main', true)
        .maybeSingle()

      if (!groupData) {
        console.log('사용자가 속한 그룹이 없습니다.')
        setTotal(0)
        return
      }

      if (groupError) {
        console.error('대표 그룹 가져오기 실패:', groupError)
        return
      }

      const { group_id } = groupData

      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')

      const { data: itemData, error: itemError } = await supabase
        .from('account_items')
        .select('amount')
        .eq('group_id', group_id)
        .eq('type', type === '수입' ? 'income' : 'expense')
        .gte('date', start)
        .lte('date', end)

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

  const { number } = useSpring({
    from: { number: 0 },
    to: { number: total },
    config: { tension: 50, friction: 12 },
    reset: true,
    immediate: total === 0
  })

  return (
    <div className="bg-white/92 flex flex-col justify-center items-center px-6 py-1 rounded-lg w-40 h-17 flex-wrap">
      <h3 className="text-[14px] font-semibold text-neutral-dark">
        이번 달 {type}
      </h3>
      <p
        className={tw(
          ' text-lg text-center text-semibold break-words max-w-full leading-tight',
          className,
          dynamicFontSize(formatted)
        )}>
        {type === '수입' ? '+' : '-'}
        <animated.span>
          {number.to(n => formatShortAmount(Math.floor(n)))}
        </animated.span>
      </p>
    </div>
  )
}

export default ThisMonthCard
