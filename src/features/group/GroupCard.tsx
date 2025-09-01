import { useUserStore } from '@/shared/stores/useUserStore'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/shallow'
import type { GroupMembers } from './create/type/type'
import { mascotList } from './create/data/mascots'
import checkIcon from '@/shared/assets/checkIcon.svg'
import Loading from '@/shared/components/loading/Loading'
import { useNavigate } from 'react-router'
import { getUserGroups } from './create/service/fetch'
import { useStorageGroup } from './model/useStorageGroup'

function GroupCard() {
  const [groups, setGroups] = useState<GroupMembers[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const user = useUserStore(useShallow(state => state.user))

  const setStorageGroup = useStorageGroup(state => state.setStorageGroup)

  useEffect(() => {
    if (!user?.id) return
    const fetchSelect = async () => {
      setIsLoading(true)
      const result = await getUserGroups(user.id)
      setGroups(result)
      setIsLoading(false)
    }
    fetchSelect()
  }, [user?.id])

  const handleCalendar = (e: React.MouseEvent, groupId: string) => {
    e.preventDefault()
    setStorageGroup(groupId)
    navigate(`/accountBook/${groupId}/calendar`)
  }

  return (
    <>
      {isLoading ? (
        <Loading
          className=" mt-17"
          imgClassName="w-30"
        />
      ) : (
        <>
          {groups &&
            groups.map(g => (
              <button
                className="bg-white w-38 h-40 rounded-lg shadow-lg shadow-gray-300 cursor-pointer hover:scale-98 transition ease-in-out"
                onClick={e => handleCalendar(e, g.group_id)}
                type="button"
                key={g.group_id}>
                <div className="bg-primary-pale h-[60%] w-full rounded-lg flex justify-center items-center relative">
                  <img
                    src={mascotList[Number(g.groups?.mascot)].src}
                    alt={mascotList[Number(g.groups?.mascot)].alt}
                    className="w-23"
                  />
                  {g.is_main === true && (
                    <img
                      src={checkIcon}
                      alt="대표아이콘"
                      className="absolute top-2 left-2"
                    />
                  )}
                </div>
                <div className="px-2 py-1">
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-black px-2.5 py-[0.3px] bg-primary-light rounded-lg">
                      {g.groups?.is_personal === true ? '개인' : '공동'}
                    </span>
                  </div>
                  <div className="mt-1.5">
                    <p className="text-black text-[15px] text-start pl-1 truncate max-w-[70%]">
                      {g.groups?.name}
                    </p>
                  </div>
                </div>
              </button>
            ))}
        </>
      )}
    </>
  )
}

export default GroupCard
