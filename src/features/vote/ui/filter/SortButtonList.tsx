import { useState } from 'react'
import ButtonLayout from '../form/ButtonLayout'
import type { Vote } from '../../model/type'
import { filterDeadline, filterHotVote, filterMyVote } from '../../utils/filter'

interface Props {
  voteList: Vote[]
  setFilteredList: (list: Vote[]) => void
}

export function SortButtonList({ voteList, setFilteredList }: Props) {
  const [sortButtonData, setSortButtonData] = useState([
    { id: 1, text: '전체', status: 'active' },
    { id: 2, text: '내 투표', status: 'inactive' },
    { id: 3, text: 'HOT', status: 'inactive' },
    { id: 4, text: '종료임박', status: 'inactive' }
  ])

  const onChangeVoteList = (clickedId: number) => {
    switch (clickedId) {
      case 1:
        setFilteredList(voteList)
        break
      case 2:
        setFilteredList(filterMyVote(voteList))
        break
      case 3:
        setFilteredList(filterHotVote(voteList))
        break
      case 4:
        setFilteredList(filterDeadline(voteList))
        break
      default:
        break
    }
  }

  const onStatusChange = (clickedId: number) => {
    const updated = sortButtonData.map(item =>
      item.id === clickedId
        ? { ...item, status: 'active' }
        : { ...item, status: 'inactive' }
    )
    onChangeVoteList(clickedId)
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
