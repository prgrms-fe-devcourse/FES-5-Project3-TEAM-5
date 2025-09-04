import { mascotList } from '@/features/group/create/data/mascots'

import { useNavigate } from 'react-router'
import { type Group } from '../service/service'
import AccountBookCardSkeleton from './AccountBookCardSkeleton'
import ArrowButton from '@/shared/components/buttons/ArrowButton'

interface Props {
  groupInfo: Group | null
  isLoading: boolean
}

function AccountBookCard({ groupInfo, isLoading }: Props) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/edit/${groupInfo?.id}`)
  }

  return (
    <div className="flex items-center gap-4 p-4 shadow-lg rounded-xl bg-white">
      {isLoading || !groupInfo ? (
        <AccountBookCardSkeleton />
      ) : (
        <>
          <div className="w-[100px] h-[100px] bg-primary-pale rounded-full flex justify-center items-center">
            <img
              src={mascotList[groupInfo.mascot!]?.src as string}
              alt="profile Icon"
              className="w-[82%] h-[82%]"
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <span className=" text-xs bg-primary-light rounded-lg py-0.5 w-[43px] text-center text-black">
              {groupInfo.is_personal && groupInfo.is_personal === true
                ? '개인'
                : '공동'}
            </span>
            <p className="text-black font-bold text-[18px] truncate max-w-55">
              {groupInfo.name}
            </p>
            <div className="flex text-neutral-dark">
              <ArrowButton
                type="right"
                text="정보 수정"
                onClick={handleClick}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AccountBookCard
