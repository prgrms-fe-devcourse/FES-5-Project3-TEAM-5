import { useUserStore } from '@/shared/stores/useUserStore'
import supabase from '@/supabase/supabase'
import { useEffect, useState } from 'react'
import type { GroupMembers } from './create/type/type'
import { mascotList } from './create/data/mascots'
import walletMomo from '@/shared/assets/momo/momo-wallet.png'
import { motion } from 'framer-motion'

function MainImage() {
  const [mascot, setMascot] = useState<number>(0)
  const [groupId, setGroupId] = useState<string | undefined>('')
  const [loading, setLoading] = useState(true)

  const user = useUserStore(state => state.user)

  useEffect(() => {
    if (!user?.id) return
    const fetchSelect = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('group_members')
        .select('group_id , groups:groups!group_members_group_id_fkey(mascot)')
        .eq('user_id', user.id)
        .eq('is_main', true)
        .maybeSingle()
        .returns<GroupMembers>()

      if (error) {
        console.error('그룹 불러오기 실패:', error)
        return
      }

      if (data?.groups?.mascot) {
        setMascot(data.groups.mascot)
        setGroupId(data.group_id)
      }
      setLoading(false)
    }
    fetchSelect()
  }, [user?.id])

  return (
    <div className="absolute right-0 top-3">
      {loading ? (
        <div className="w-50 h-50 flex items-center justify-center animate-pulse">
          <span className="text-xs text-gray-400"> </span>
        </div>
      ) : (
        <motion.img
          key={groupId ? mascotList[mascot].src : walletMomo}
          src={groupId ? mascotList[mascot].src : walletMomo}
          alt={groupId ? mascotList[mascot].alt : '처음 사용자 모모 이미지'}
          className="w-50 opacity-85"
          initial={{ y: -50, scale: 0.8, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
            bounce: 0.3,
            duration: 0.7
          }}
        />
      )}
    </div>
  )
}

export default MainImage
