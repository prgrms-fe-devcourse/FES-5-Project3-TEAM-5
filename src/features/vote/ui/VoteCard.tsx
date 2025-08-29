import { Link } from 'react-router'
import { ResultOption } from './ResultOption'
import type { VoteOptions, VoteSelections } from '../model/responseBody'
import { formatDate } from '../utils/Date'
import { tw } from '@/shared/utils/tw'

interface Props {
  voteId: string
  question: string
  startsAt: string
  deadline: string
  isMine: boolean
  isActive: boolean
  voteOptions: VoteOptions[]
  participants: number
  mySelect: VoteSelections[]
  openDeleteModal: (deleteId: string) => void
  onSelect: (vote_id: string, option_id: string) => void
}

export function VoteCard({
  question,
  voteOptions,
  deadline,
  startsAt,
  isMine,
  voteId,
  isActive,
  participants,
  openDeleteModal,
  mySelect,
  onSelect
}: Props) {
  const startedDate = formatDate(startsAt)
  const divClassName = () => {
    switch (isActive) {
      case true:
        return 'border-primary-light '
      case false:
        return 'bg-neutral-light border-neutral-DEFAULT '
      default:
        break
    }
  }
  const deadlineClassName = () => {
    if (isActive) {
      return 'text-black'
    } else {
      return 'text-neutral-dark '
    }
  }

  return (
    <div
      className={tw(
        'flex flex-col w-full p-4 gap-4 rounded-lg border-2 ',
        divClassName()
      )}>
      <div className="flex justify-between text-neutral-dark text-size-md">
        <p>
          {startedDate}
          <span className={tw(' font-bold ml-3', deadlineClassName())}>
            {deadline}
          </span>
        </p>
        {isMine && (
          <div className="flex gap-2">
            <Link to={`/vote/edit/${voteId}`}>
              <button className="hover:font-bold  cursor-pointer">수정</button>
            </Link>
            <button
              className="hover:font-bold  cursor-pointer"
              onClick={() => openDeleteModal(voteId)}>
              삭제
            </button>
          </div>
        )}
      </div>
      <div
        className="bg-neutral-light p-3 rounded-lg border-2 border-neutral-200 text-black break-keep
wrap-break-word">
        <p>{question}</p>
      </div>
      {voteOptions &&
        voteOptions.map(({ content, id }) => {
          const isSelected = mySelect?.some(sel => sel.option_id === id)
          return (
            <ResultOption
              key={id}
              onSelect={onSelect}
              optionId={id}
              voteId={voteId}
              participants={participants}
              selectionText={content}
              isSelected={isSelected}
            />
          )
        })}
      <p className="text-size-md text-neutral-dark">{participants}명 참여</p>
    </div>
  )
}
