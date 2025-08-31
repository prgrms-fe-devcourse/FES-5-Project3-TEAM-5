import { useUserStore } from '@/shared/stores/useUserStore'
import supabase from '@/supabase/supabase'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/shallow'

function NumberGroup() {
  const [count, setCount] = useState(0)

  const user = useUserStore(useShallow(state => state.user))

  useEffect(() => {
    if (!user?.id) return
    const fetchSelect = async () => {
      const { count, error } = await supabase
        .from('groups')
        .select('*', { count: 'exact' })
        .match({ user_id: user.id })

      if (error) {
        console.error('그룹 불러오기 실패:', error)
        return
      }

      if (count) {
        setCount(count)
      }
    }
    fetchSelect()
  }, [user?.id])

  return <p className="text-neutral-dark pb-1">{count}개의 가계부</p>
}

export default NumberGroup
