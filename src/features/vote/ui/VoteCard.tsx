import { Link } from 'react-router'
import { ResultOption } from './ResultOption'

interface Props {
  people: number
  isMine: boolean
  question: string
  onDelete: () => void
}

export function VoteCard({
  people,
  isMine = false,
  question,
  onDelete
}: Props) {
  return (
    <div className="flex flex-col w-full p-4 gap-4 rounded-lg border-2 border-primary-light ">
      <div className="flex justify-between text-neutral-dark text-size-md">
        <p>
          11월 22일 토
          <span className="text-black font-bold ml-3 ">종료 1시간 전!</span>
        </p>
        {isMine && (
          <div className="flex gap-2 cursor-pointer">
            <Link to={'/vote/edit/:editId'}>
              <button className="hover:font-bold">수정</button>
            </Link>
            <button
              className="hover:font-bold"
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

      <ResultOption
        status="unselected"
        percent={70}
        selectionText={'먹는다'}
      />
      <ResultOption
        status="selected"
        percent={20}
        selectionText={'안 먹고 잔다'}
      />

      <p className="text-size-md text-neutral-dark">{people}명 참여</p>
    </div>
  )
}
