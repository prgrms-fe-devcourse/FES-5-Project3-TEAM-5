import { useEffect, useState } from 'react'
import ButtonLayout from './ButtonLayout'

interface Props {
  deadline: number | null
}

export function EditTimeButtonList({ deadline }: Props) {
  const [sortButtonData, setSortButtonData] = useState([
    { id: '1', text: '1시간', status: 'inactive' },
    { id: '12', text: '12시간', status: 'inactive' },
    { id: '24', text: '24시간', status: 'inactive' }
  ])

  useEffect(() => {
    if (deadline !== null) {
      setSortButtonData(prev =>
        prev.map(item =>
          item.id === String(deadline)
            ? { ...item, status: 'active' }
            : { ...item, status: 'disabled' }
        )
      )
    }
  }, [deadline])

  return (
    <div>
      <h3 className="text-size-lg font-bold text-neutral-dark mb-3">
        투표 종료 시간
      </h3>
      <div className="flex gap-x-4">
        {sortButtonData.map(item => (
          <ButtonLayout
            key={item.id}
            id={item.id}
            status={item.status}
            text={item.text}
            onStatusChange={() => {}}
            disabled={item.status === 'disabled'}
          />
        ))}
      </div>
    </div>
  )
}
