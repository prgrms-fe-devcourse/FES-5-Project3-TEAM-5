import { useEffect, useState } from 'react'
import supabase from '@/supabase/supabase'
import { useUserStore } from '@/shared/stores/useUserStore'

export function useInitialIsMain() {
  const user = useUserStore(state => state.user)
  const [isMain, setIsMain] = useState<boolean | null>(null)

  useEffect(() => {
    if (!user?.id) {
      setIsMain(false)
      return
    }

    const checkUserGroups = async () => {
      try {
        const { data, error } = await supabase
          .from('group_members')
          .select('is_main')
          .eq('user_id', user.id)
          .eq('is_main', true)

        if (error) {
          console.error('대표 가계부 조회 실패', error)
          setIsMain(false)
          return
        }
        setIsMain(data.length === 0)
      } catch (err) {
        console.error('오류:', err)
        setIsMain(false)
      }
    }

    checkUserGroups()
  }, [user?.id])

  return isMain
}
