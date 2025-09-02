import { useEffect, useState } from 'react'
import { useUserStore } from '@/shared/stores/useUserStore'
import supabase from '@/supabase/supabase'
import { useParams } from 'react-router'

interface JoinedUsers {
  user_id: string
  users: {
    id: string
    email: string
    nickname: string
    created_at: string
  }
}

function InvitedList() {
  const [invitedList, setInvitedList] = useState<JoinedUsers['users'][]>([])
  const user = useUserStore(state => state.user)
  const { groupId } = useParams()

  useEffect(() => {
    if (!user?.id) return
    const fetchInvitedUser = async () => {
      const { data, error } = await supabase
        .from('group_members')
        .select('user_id, users(*)')
        .eq('group_id', groupId)
        .returns<JoinedUsers[]>()

      if (error) {
        console.error('초대된 멤버 불러오기 : ', error)
        return
      }

      if (data) {
        const users = data.map(d => d.users).filter(u => u.id !== user.id)
        setInvitedList(users)
      }
    }
    fetchInvitedUser()
  }, [user?.id, groupId])

  const handleDeleteUser = (id: string) => {
    setInvitedList(prev => prev.filter(s => s.id !== id))
  }

  return (
    <div className="mt-2">
      <ul className="flex flex-col px-1 py-3 gap-3">
        {invitedList.length > 0 &&
          invitedList.map(i => (
            <li
              key={i.id}
              className="bg-primary-pale p-3 flex gap-2 rounded-lg text-sm text-black pr-0">
              <div className="w-full flex justify-between flex-wrap px-2">
                <span className="truncate max-w-[50%] min-w-[40%]">
                  {i.nickname}
                </span>
                <span className="truncate max-w-[90%]">{i.email}</span>
              </div>
              <button
                type="button"
                className="cursor-pointer bg-primary-pale"
                onClick={() => handleDeleteUser(i.id)}></button>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default InvitedList
