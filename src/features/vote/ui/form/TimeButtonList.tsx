import { useState } from 'react'
import ButtonLayout from './ButtonLayout'
import type { VoteTime } from '../../model/requestBody'

interface Props {
  voteTimeRef: React.RefObject<VoteTime | null>
}

export function TimeButtonList({ voteTimeRef }: Props) {
  const [sortButtonData, setSortButtonData] = useState([
    { id: '1', text: '1시간', status: 'inactive' },
    { id: '12', text: '12시간', status: 'inactive' },
    { id: '24', text: '24시간', status: 'inactive' }
  ])

  const setRequestDate = (hours: number) => {
    const starts_at = new Date()
    const ends_at = new Date(starts_at.getTime() + hours * 60 * 60 * 1000)
    voteTimeRef.current = {
      starts_at: starts_at.toISOString(),
      ends_at: ends_at.toISOString()
    }
  }

  const onStatusChange = (clickedId: string) => {
    const updated = sortButtonData.map(item =>
      item.id === clickedId
        ? { ...item, status: 'active' }
        : { ...item, status: 'inactive' }
    )
    setRequestDate(Number(clickedId))
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
