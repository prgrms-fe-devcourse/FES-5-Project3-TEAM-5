import { getExcelData } from '@/features/accountbook/setting/service/exportExcel'
import {
  fetchGroups,
  type Group
} from '@/features/accountbook/setting/service/service'
import AccountBookCard from '@/features/accountbook/setting/ui/AccountBookCard'
import ServiceCard from '@/features/accountbook/setting/ui/ServiceCard'
import {
  downloadExcel,
  getDateRange
} from '@/features/accountbook/setting/utils/exportExcel'

import { useUserStore } from '@/shared/stores/useUserStore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

function SettingPage() {
  const { groupId } = useParams()
  const [groupInfo, setGroupInfo] = useState<Group | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleExportExcel = async (selectedDate: {
    year: number
    month: number
  }) => {
    const userId = useUserStore.getState().user!.id
    const { year, month } = selectedDate
    console.log(selectedDate)
    const { startDate, endDate } = getDateRange(year, month)

    // 데이터
    const data = await getExcelData({
      groupId: String(groupId),
      userId,
      startDate,
      endDate
    })

    downloadExcel(data)
  }

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
    <div className="flex flex-col gap-6 p-4">
      <AccountBookCard
        groupInfo={groupInfo}
        isLoading={isLoading}
      />
      <ServiceCard
        groupInfo={groupInfo}
        handleExportExcel={handleExportExcel}
      />
    </div>
  )
}
export default SettingPage
