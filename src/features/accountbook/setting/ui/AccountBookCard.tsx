import ArrowBtn from '@/features/group/create/ArrowBtn'
import { mascotList } from '@/features/group/create/data/mascots'
import { useUserStore } from '@/shared/stores/useUserStore'
import supabase from '@/supabase/supabase'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/shallow'

type CalendarInfo = {
  name: string
  isPersonal: boolean | null
  mascot: number | undefined
}

function AccountBookCard() {
  const [calendarInfo, setCalendarInfo] = useState<CalendarInfo>({
    name: '',
    isPersonal: null,
    mascot: undefined
  })

  const user = useUserStore(useShallow(state => state.user))

  useEffect(() => {
    if (!user?.id) return
    const fetchUserCalendar = async () => {
      const { data, error } = await supabase
        .from('groups')
        .select('name, is_personal, mascot')
        .eq('user_id', 'ce57b8cd-2890-4840-a817-97196f18dcd0')
        .eq('id', 'f20b8add-756e-40d8-8990-e15ecb4ea546')
        .single()

      if (error) {
        console.error('정보 불러오기 실패:', error)
        return
      }

      if (data) {
        setCalendarInfo(prev => ({
          ...prev,
          name: data.name,
          isPersonal: data.is_personal,
          mascot: data.mascot
        }))
      }
    }
    fetchUserCalendar()
  }, [user?.id])

  const handleClick = () => {}

  return (
    <div className="flex items-center gap-4 p-4 shadow-lg rounded-xl bg-white">
      <div className="w-[100px] h-[100px] bg-primary-pale rounded-full flex justify-center items-center">
        <img
          src={mascotList[calendarInfo.mascot!]?.src as string}
          alt="profile Icon"
          className="w-[87%] h-[87%]"
        />
      </div>
      <div className="flex flex-col gap-1 ">
        <span className=" text-xs bg-primary-light rounded-lg py-0.5 w-[43px] text-center text-black">
          {calendarInfo.isPersonal && calendarInfo.isPersonal === true
            ? '개인'
            : '공동'}
        </span>
        <p className="text-black font-bold text-[18px] truncate max-w-55">
          {calendarInfo.name}
        </p>
        <div className="flex text-neutral-dark">
          <p>정보 수정</p>
          <ArrowBtn
            type="right"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  )
}

export default AccountBookCard
