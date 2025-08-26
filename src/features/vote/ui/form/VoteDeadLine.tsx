import { TimeButtonList } from './TimeButtonList'

export function VoteDeadLine() {
  return (
    <div>
      <h3 className="text-size-lg font-bold text-neutral-dark mb-3">
        투표 종료 시간
      </h3>
      <TimeButtonList />
    </div>
  )
}
