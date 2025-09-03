import ArrowBtn from '@/features/group/create/ArrowBtn'
import { mascotList } from '@/features/group/create/data/mascots'
import { useUserStore } from '@/shared/stores/useUserStore'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useShallow } from 'zustand/shallow'
import { fetchGroups } from '../service/service'

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

  const { groupId } = useParams()
  const user = useUserStore(useShallow(state => state.user))
  const navigate = useNavigate()

  useEffect(() => {
    if (!groupId && !user?.id) return
    const fetchData = async () => {
      const data = await fetchGroups(groupId)
      if (data) {
        setCalendarInfo({
          name: data.name,
          isPersonal: data.is_personal,
          mascot: data.mascot
        })
      }
    }
    fetchData()
  }, [groupId, user?.id])

  const handleClick = () => {
    navigate(`/edit/${groupId}`)
  }

  return (
    <div className="flex items-center gap-4 p-4 shadow-lg rounded-xl bg-white">
      <div className="w-[100px] h-[100px] bg-primary-pale rounded-full flex justify-center items-center">
        <img
          src={mascotList[calendarInfo.mascot!]?.src as string}
          alt="profile Icon"
          className="w-[82%] h-[82%]"
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
