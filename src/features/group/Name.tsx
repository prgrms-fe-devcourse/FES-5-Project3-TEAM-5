import { useUserStore } from '@/shared/stores/useUserStore'
import supabase from '@/supabase/supabase'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/shallow'

function Name() {
  const [name, setName] = useState('')

  const user = useUserStore(useShallow(state => state.user))

  useEffect(() => {
    if (!user?.id) return
    const fetchSelect = async () => {
      const { data, error } = await supabase

        .from('groups')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_main', true)

      if (error) {
        console.error('그룹 불러오기 실패:', error)
        return
      }

      if (data && data.length > 0) {
        setName(data[0].name)
      } else {
        console.log('대표 가계부 없음')
      }
    }
    fetchSelect()
  }, [user?.id])

  return (
    <h1 className="font-semibold text-black text-lg sm:ml-5 ml-4">{name}</h1>
  )
}

export default Name
