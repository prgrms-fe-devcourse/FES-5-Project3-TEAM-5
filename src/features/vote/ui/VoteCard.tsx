import { Link } from 'react-router'
import { ResultOption } from './ResultOption'
import type { VoteOptions } from '../model/type'
import { formatDate, getDeadline } from '../utils/Date'
import { useUserStore } from '@/shared/stores/useUserStore'

interface Props {
  people: number
  question: string
  starts_at: string
  ends_at: string
  writer: string
  vote_options: VoteOptions[]
  onDelete: () => void
}

export function VoteCard({
  people,
  question,
  vote_options,
  ends_at,
  starts_at,
  writer,
  onDelete
}: Props) {
  const startedDate = formatDate(starts_at)
  const deadline = getDeadline(ends_at)
  const userId = useUserStore(state => state.user?.id)
  const isMine = userId === writer

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
            <Link to={'/vote/edit/:editId'}>
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
