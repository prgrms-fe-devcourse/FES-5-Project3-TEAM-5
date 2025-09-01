import { useUserStore } from '@/shared/stores/useUserStore'
import supabase from '@/supabase/supabase'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/shallow'

function Name() {
  const [name, setName] = useState<string>('')

  const user = useUserStore(useShallow(state => state.user))

  useEffect(() => {
    if (!user?.id) return
    const fetchSelect = async () => {
      const { data, error } = await supabase
        .from('group_members')
        .select('group_id, groups(name)')
        .eq('user_id', user.id)
        .eq('is_main', true)
        .maybeSingle()

      if (error) {
        console.error('그룹 불러오기 실패:', error)
        return
      }

      if (data) {
        setName(data.groups.name)
      }
    }
    fetchSelect()
  }, [user?.id])

  return (
    <h1 className="font-semibold text-black text-xl sm:ml-5 ml-4 pt-1">
      {name?.trim() ? name : '반가워요. 새 가계부를 만들어주세요.'}
    </h1>
  )
}

export default Name
