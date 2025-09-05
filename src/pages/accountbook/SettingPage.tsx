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

import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useSnackbarStore } from '@/shared/stores/useSnackbarStore'

function SettingPage() {
  const { groupId } = useParams()
  const [groupInfo, setGroupInfo] = useState<Group | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const showSnackbar = useSnackbarStore(state => state.showSnackbar)

  const handleExportExcel = async (selectedDate: {
    year: number
    month: number
  }) => {
    const { year, month } = selectedDate
    const { startDate, endDate } = getDateRange(year, month)

    const data = await getExcelData({
      groupId: String(groupId),
      startDate,
      endDate
    })

    downloadExcel(data, { showSnackbar })
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
