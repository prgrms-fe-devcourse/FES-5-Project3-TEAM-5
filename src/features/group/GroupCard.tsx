import { useUserStore } from '@/shared/stores/useUserStore'
import supabase from '@/supabase/supabase'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/shallow'
import type { Group } from './create/type/type'
import { mascotList } from './create/data/mascots'
import checkIcon from '@/shared/assets/checkIcon.svg'
import Loading from '@/shared/components/loading/Loading'

function GroupCard() {
  const [groups, setGroups] = useState<Group[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const user = useUserStore(useShallow(state => state.user))

  useEffect(() => {
    if (!user?.id) return
    const fetchSelect = async () => {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .eq('user_id', user.id)

      if (error) {
        console.error('그룹 불러오기 실패:', error)
        return
      }

      if (data) {
        setGroups(data)
      }
      setIsLoading(false)
    }
    fetchSelect()
  }, [user?.id])

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
                key={g.id}>
                <div className="bg-primary-pale h-[60%] w-full rounded-lg flex justify-center items-center relative">
                  <img
                    src={mascotList[Number(g.mascot)].src}
                    alt={mascotList[Number(g.mascot)].alt}
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
                      {g.is_personal === true ? '개인' : '공동'}
                    </span>
                    <span className="text-neutral-dark font-light">1일전</span>
                  </div>
                  <div className="mt-1.5">
                    <p className="text-black text-[15px] text-start pl-1 truncate max-w-[70%]">
                      {g.name}
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
