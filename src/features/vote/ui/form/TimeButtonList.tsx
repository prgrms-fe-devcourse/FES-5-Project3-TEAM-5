import { useState } from 'react'
import ButtonLayout from './ButtonLayout'

function TimeButtonList() {
  const [sortButtonData, setSortButtonData] = useState([
    { id: 1, text: '1시간', status: 'inactive' },
    { id: 2, text: '12시간', status: 'inactive' },
    { id: 3, text: '24시간', status: 'inactive' }
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
export default TimeButtonList
