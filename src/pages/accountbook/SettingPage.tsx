import {
  fetchGroups,
  type Group
} from '@/features/accountbook/setting/service/service'
import AccountBookCard from '@/features/accountbook/setting/ui/AccountBookCard'
import ServiceCard from '@/features/accountbook/setting/ui/ServiceCard'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

function SettingPage() {
  const { groupId } = useParams()
  const [groupInfo, setGroupInfo] = useState<Group | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!groupId) return
    const fetchData = async () => {
      const data = await fetchGroups(groupId)
      if (data) setGroupInfo(data)
      setIsLoading(false)
    }
    fetchData()
  }, [groupId])

  return (
    <div className="flex flex-col gap-6">
      <AccountBookCard
        groupInfo={groupInfo}
        isLoading={isLoading}
      />
      <ServiceCard groupInfo={groupInfo} />
    </div>
  )
}
export default SettingPage
