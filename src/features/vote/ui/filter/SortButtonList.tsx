import { useState } from 'react'
import ButtonLayout from '../form/ButtonLayout'

export function SortButtonList() {
  const [sortButtonData, setSortButtonData] = useState([
    { id: 1, text: '전체', status: 'active' },
    { id: 2, text: '내 투표', status: 'inactive' },
    { id: 3, text: 'HOT', status: 'inactive' },
    { id: 4, text: '종료임박', status: 'inactive' }
  ])

  const onStatusChange = (clickedId: number) => {
    const updated = sortButtonData.map(item =>
      item.id === clickedId
        ? { ...item, status: 'active' }
        : { ...item, status: 'inactive' }
    )
    setSortButtonData(updated)
  }

  return (
    <div className="flex gap-x-4">
      {sortButtonData.map(item => (
        <ButtonLayout
          key={item.id}
          id={item.id}
          status={item.status}
          text={item.text}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  )
}
