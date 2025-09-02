import { useEffect, useState } from 'react'
import ExportExcelModal from './exportExcel/ExportExcelModal'
import { useNavigate, useParams } from 'react-router'
import DeleteModal from './deleteGroup/DeleteModal'

const serviceList = [
  { value: 'inviteUser', text: '초대하기' },
  { value: 'exportExcel', text: '엑셀 내보내기' },
  { value: 'deleteAccountBook', text: '가계부 삭제' }
]

interface Delete {
  isOwner: boolean
  delete: boolean
}

function ServiceCard() {
  // handleExportExcel
  const [isExport, setIsExport] = useState(false)
  const [isDelete, setIsDelete] = useState<Delete>({
    isOwner: false,
    delete: false
  })
  const navigate = useNavigate()
  const { groupId } = useParams()

  const handleExportExcel = () => {
    setIsExport(!isExport)
  }

  const handleDelete = () => {
    setIsDelete(prev => ({ ...prev, delete: !prev.delete }))
  }

  const handleService = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    const target = e.target as HTMLButtonElement
    switch (target.value) {
      case 'exportExcel':
        handleExportExcel()
        break
      case 'inviteUser':
        navigate(`/edit/${groupId}/invite`)
        break
      case 'deleteAccountBook':
        handleDelete()
        break
      default:
        break
    }
  }

  useEffect(() => {}, [handleExportExcel])

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
      {isDelete.delete && (
        <DeleteModal
          isDelete={isDelete}
          onCancel={handleDelete}
        />
      )}
      {isExport && <ExportExcelModal onCancel={handleExportExcel} />}
    </>
  )
}
export default ServiceCard
