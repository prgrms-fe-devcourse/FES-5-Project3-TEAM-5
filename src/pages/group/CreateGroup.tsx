import CreateBtn from '@/features/group/create/CreateBtn'
import GroupName from '@/features/group/create/GroupName'
import Invite from '@/features/group/create/Invite'
import Mascot from '@/features/group/create/Mascot'
import Toggle from '@/features/group/create/Toggle'
import { useState } from 'react'

function CreateGroup() {
  const [isGroup, setIsGroup] = useState(true)

  return (
    <div className="p-3 flex flex-col gap-7">
      <GroupName />
      <Mascot />
      <Toggle
        header="대표 가계부 설정"
        btn1="네"
        btn2="아니오"
      />
      <Toggle
        header="가계부 설정"
        btn1="개인"
        btn2="그룹"
      />
      {isGroup && <Invite />}
      <CreateBtn />
    </div>
  )
}

export default CreateGroup
