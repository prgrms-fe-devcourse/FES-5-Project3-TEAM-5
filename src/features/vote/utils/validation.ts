import type { VoteTime } from '../model/requestBody'

interface Props {
  userId?: string
  voteTime?: VoteTime | null
  title?: string
  firstOption?: string
  secondOption?: string
}
export function validateAddVote({
  userId,
  voteTime,
  title,
  firstOption,
  secondOption
}: Props): string | null {
  if (!userId) return '사용자 정보가 없습니다'
  if (!voteTime || !voteTime.starts_at || !voteTime.ends_at)
    return '투표 시간을 설정해야 합니다'
  if (!title || title.trim() === '') return '투표 질문을 입력해야 합니다'
  if (!firstOption || !secondOption) return '모든 선택지를 입력해야 합니다'
  return null
}
