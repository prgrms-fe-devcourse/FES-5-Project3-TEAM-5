import { useUserStore } from '@/shared/stores/useUserStore'
import supabase from '@/supabase/supabase'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/shallow'
import type { GroupMembers } from './create/type/type'
import type { User } from '@supabase/supabase-js'
import { getRandomMessage, welcomeMessages } from './data/welcome'

function Name() {
  const [name, setName] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [groupId, setGroupId] = useState<string | undefined>('')
  const [userName, setUserName] = useState('')
  const [randomMessage, setRandomMessage] = useState('')

  const user = useUserStore(useShallow(state => state.user))

  useEffect(() => {
    setRandomMessage(getRandomMessage())
  }, [])

  const extractUserName = (user: User | null): string => {
    if (!user) return ''

    const metadata = user.user_metadata

    // 1. 닉네임 우선 (구글/카카오 가능)
    if (metadata.nickname) return metadata.nickname

    // 2. name이 있을 경우 (구글 가능)
    if (metadata.name) return metadata.name

    // 3. 이메일의 앞부분 fallback
    if (user.email) return user.email.split('@')[0]

    return '사용자'
  }

  useEffect(() => {
    if (!user?.id) return

    const name = extractUserName(user)
    setUserName(name)

    const fetchSelect = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('group_members')
        .select('group_id, groups:groups!group_members_group_id_fkey(name)')
        .eq('user_id', user.id)
        .eq('is_main', true)
        .maybeSingle()
        .returns<GroupMembers>()

      if (error) {
        console.error('그룹 불러오기 실패:', error)
        return
      }

      if (data?.groups?.name) {
        setName(data.groups.name)
        setGroupId(data.group_id)
      }
      setLoading(false)
    }
    fetchSelect()
  }, [user?.id])

  return (
    <>
      <h1 className=" text-[#100E14] text-xl pt-1 mt-2 whitespace-pre-line">
        {loading ? (
          <>
            {/* 🔸 로딩 시 스켈레톤 */}
            <span className="w-[120px] h-[20px] mb-1 rounded-md bg-primary-pale/60 animate-pulse inline-block opacity-40" />
            <br />
            <span className="w-[150px] h-[30px] mt-1 rounded-md bg-primary-pale/60 animate-pulse inline-block opacity-40" />
          </>
        ) : !groupId ? (
          <>
            {/* 🔸 그룹 없음 (로딩 끝나고도 groupId 없음) */}
            <span className="text-[16px]">환영합니다 {userName}님</span>
            <br />
            <span className="font-semibold text-[25px]">
              오늘부터 또 모아볼까요?
            </span>
          </>
        ) : (
          <>
            {/* 🔸 그룹 있음 */}
            <span className="text-[16px]">{randomMessage}</span>
            <br />
            <span className="font-semibold text-[25px]">{name.trim()}</span>
          </>
        )}
      </h1>
    </>
  )
}

export default Name
