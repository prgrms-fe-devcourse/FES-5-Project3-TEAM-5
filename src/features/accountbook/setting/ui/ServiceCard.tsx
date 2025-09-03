import { useEffect, useState } from 'react'
import ExportExcelModal from './exportExcel/ExportExcelModal'
import { useNavigate } from 'react-router'
import DeleteModal from './deleteGroup/DeleteModal'
import { type Group } from '../service/service'
import { useUserStore } from '@/shared/stores/useUserStore'
import type { Delete } from '../model/groupDelete'
import { useStorageGroup } from '@/features/group/model/useStorageGroup'

const serviceList = [
  { value: 'inviteUser', text: '초대하기' },
  { value: 'exportExcel', text: '엑셀 내보내기' },
  { value: 'deleteAccountBook', text: '가계부 삭제' }
]

interface Props {
  groupInfo: Group | null
  handleExportExcel: (selectedDate: {
    year: number
    month: number
  }) => Promise<void>
}

function ServiceCard({ groupInfo, handleExportExcel }: Props) {
  const [isExport, setIsExport] = useState(false)
  const [isDelete, setIsDelete] = useState<Delete>({
    isOwner: false,
    delete: false
  })

  const navigate = useNavigate()
  const userId = useUserStore(state => state.user?.id)

  const clearStorageGroup = useStorageGroup(state => state.clearStorageGroup)

  useEffect(() => {
    if (groupInfo && groupInfo.user_id === userId) {
      setIsDelete(prev => ({ ...prev, isOwner: true }))
    }
  }, [groupInfo, userId])

  const openExportExcel = () => {
    setIsExport(!isExport)
  }

  const handleDelete = () => {
    setIsDelete(prev => ({ ...prev, delete: !prev.delete }))
    clearStorageGroup()
  }

  const handleService = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    const target = e.target as HTMLButtonElement
    switch (target.value) {
      case 'exportExcel':
        openExportExcel()
        break
      case 'inviteUser':
        navigate(`/edit/${groupInfo?.id}/invite`)
        break
      case 'deleteAccountBook':
        handleDelete()
        break
      default:
        break
    }
  }

  useEffect(() => {}, [openExportExcel])
  return (
    <>
      <div className="flex flex-col gap-4 px-4 py-6 bg-white rounded-xl shadow-md">
        <h2 className="text-neutral-dark font-bold  text-size-lg">
          가계부 서비스
        </h2>
        <ul className="flex flex-col gap-3">
          {serviceList.map(({ value, text }) => (
            <li
              key={value}
              className="hover:black  hover:font-bold transition ease-in-out">
              <button
                value={value}
                className="cursor-pointer text-size-lg"
                onClick={handleService}>
                {text}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <DeleteModal
        isDelete={isDelete}
        onCancel={handleDelete}
        setIsDelete={setIsDelete}
      />
      
      <ExportExcelModal
        isExport={isExport}
        onCancel={openExportExcel}
        onExport={handleExportExcel}
      />
    </>
  )
}
export default ServiceCard