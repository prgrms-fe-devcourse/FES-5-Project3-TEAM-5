import { Link } from 'react-router'
import { ResultOption } from './ResultOption'
import type { VoteOptions } from '../model/type'
import { formatDate, getDeadline } from '../utils/Date'

interface Props {
  people: number
  vote_id: string
  question: string
  starts_at: string
  deadline: string
  isMine: boolean
  vote_options: VoteOptions[]
  onDelete: () => void
}

export function VoteCard({
  people,
  question,
  vote_options,
  deadline,
  starts_at,
  isMine,
  vote_id,
  onDelete
}: Props) {
  const startedDate = formatDate(starts_at)

  return (
    <div className="flex flex-col w-full p-4 gap-4 rounded-lg border-2 border-primary-light ">
      <div className="flex justify-between text-neutral-dark text-size-md">
        <p>
          {startedDate}
          <span className="text-black font-bold ml-3 ">
            종료 {deadline} 전!
          </span>
        </p>
        {isMine && (
          <div className="flex gap-2">
            <Link to={`/vote/edit/${vote_id}`}>
              <button className="hover:font-bold  cursor-pointer">수정</button>
            </Link>
            <button
              className="hover:font-bold  cursor-pointer"
              onClick={onDelete}>
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

      {vote_options &&
        vote_options.map(({ content, id }) => (
          <ResultOption
            key={id}
            percent={100}
            selectionText={content}
          />
        ))}

      <p className="text-size-md text-neutral-dark">{people}명 참여</p>
    </div>
  )
}
