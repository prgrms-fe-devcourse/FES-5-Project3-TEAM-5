import { useState } from 'react'
import ButtonLayout from '../form/ButtonLayout'
import type { TotalVote } from '../../model/responseBody'
import {
  sortByParticipantsDesc,
  sortByDeadlineAsc,
  sortByDeadlineDesc,
  filterMyVote
} from '../../utils/filterVoteList'
import { useUserStore } from '@/shared/stores/useUserStore'

interface Props {
  voteList: TotalVote[]
  setFilteredList: (list: TotalVote[]) => void
}

export function SortButtonList({ voteList, setFilteredList }: Props) {
  const userId = useUserStore.getState().user?.id
  const [sortButtonData, setSortButtonData] = useState([
    { id: 'total', text: '전체', status: 'active' },
    { id: 'myVote', text: '내 투표', status: 'inactive' },
    { id: 'hot', text: 'HOT', status: 'inactive' },
    { id: 'deadline', text: '종료임박', status: 'inactive' }
  ])

  const onChangeVoteList = (clickedId: string) => {
    switch (clickedId) {
      case 'total':
        setFilteredList(sortByDeadlineDesc(voteList))
        break
      case 'myVote':
        setFilteredList(filterMyVote(voteList, userId))
        break
      case 'hot':
        setFilteredList(sortByParticipantsDesc(voteList))
        break
      case 'deadline':
        setFilteredList(sortByDeadlineAsc(voteList))
        break
      default:
        setFilteredList(sortByDeadlineDesc(voteList))
        break
    }
  }

  const onStatusChange = (clickedId: string) => {
    onChangeVoteList(clickedId)

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
