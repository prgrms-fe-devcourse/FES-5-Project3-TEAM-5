import { useState } from 'react'
import ButtonLayout from './ButtonLayout'

export function TimeButtonList() {
  const [sortButtonData, setSortButtonData] = useState([
    { id: '1', text: '1시간', status: 'inactive' },
    { id: '12', text: '12시간', status: 'inactive' },
    { id: '24', text: '24시간', status: 'inactive' }
  ])

  const onStatusChange = (clickedId: string) => {
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
