import { useUserStore } from '@/shared/stores/useUserStore'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/shallow'
import type { GroupMembers } from './create/type/type'
import { mascotList } from './create/data/mascots'
import Loading from '@/shared/components/loading/Loading'
import { useNavigate } from 'react-router'
import { getUserGroups } from './create/service/fetch'
import { useStorageGroup } from './model/useStorageGroup'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants, TargetAndTransition } from 'framer-motion'

function GroupCard() {
  const [groups, setGroups] = useState<GroupMembers[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const user = useUserStore(useShallow(state => state.user))

  const setStorageGroup = useStorageGroup(state => state.setStorageGroup) // 그룹 선택시 해당 아이디 로컬스토리지 저장 => 나중에 가계부 nav를 위해서 저장

  useEffect(() => {
    if (!user?.id) return
    const fetchSelect = async () => {
      setIsLoading(true)
      const result = await getUserGroups(user.id)

      const sorted = result.sort((a, b) => {
        if (a.is_main && !b.is_main) return -1
        if (!a.is_main && b.is_main) return 1
        return 0
      })

      setGroups(sorted)
      setIsLoading(false)
    }
    fetchSelect()
  }, [user?.id])

  const handleCalendar = (
    e: React.MouseEvent,
    groupId: string,
    groupName: string
  ) => {
    e.preventDefault()
    setStorageGroup(groupId)
    navigate(`/accountBook/${groupId}/calendar`)
    localStorage.setItem('groupName', groupName)
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 9 },
    visible: (i: number): TargetAndTransition => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        type: 'spring',
        stiffness: 60, // 강도 낮춤
        damping: 14 // 감쇠 부드럽게
      }
    })
  }

  return (
    <>
      {isLoading ? (
        <Loading
          className="mt-80"
          size={38}
        />
      ) : groups.length === 0 ? (
        <div className="text-center text-gray-400 w-full py-6 mt-10 text-sm">
          등록된 가계부가 없습니다.
        </div>
      ) : (
        <AnimatePresence>
          {' '}
          {groups &&
            groups.map((g, i) => (
              <motion.button
                className="bg-white w-38  pb-1 rounded-lg border-1 overflow-hidden shadow-lg shadow-gray-300 cursor-pointer hover:scale-98 transition ease-in-out"
                onClick={e =>
                  handleCalendar(e, g.group_id, g.groups?.name || '')
                }
                type="button"
                key={g.group_id}
                custom={i}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={itemVariants}>
                <div className="bg-primary-pale w-full h-21 flex justify-center items-center">
                  <img
                    src={mascotList[Number(g.groups?.mascot)].src}
                    alt={mascotList[Number(g.groups?.mascot)].alt}
                    className="w-18 block"
                  />
                </div>
                <div className="px-2 py-1 mt-2">
                  <div className="flex justify-start gap-1 items-center text-[13px]">
                    {g.is_main === true && (
                      <div className="text-white px-2 py-[0.5px] bg-primary-base rounded-lg">
                        대표
                      </div>
                    )}
                    <span className="text-black px-2 py-[0.5px] bg-primary-light rounded-lg">
                      {g.groups?.is_personal === true ? '개인' : '공동'}
                    </span>
                  </div>
                  <div className="mt-1.5">
                    <p className="text-black text-[15px] text-start pl-1 flex-wrap truncate max-w-90">
                      {g.groups?.name}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
        </AnimatePresence>
      )}
    </>
  )
}

export default GroupCard
