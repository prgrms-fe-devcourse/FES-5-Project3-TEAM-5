import type { Reactions } from '../model/responseBody'

// 좋아요, 싫어요 버튼 수 카운트
export function getReactionCount(reactions: Reactions[]) {
  if (!reactions) return { dislike: 0, like: 0 }
  const dislike = reactions.filter(item => item.kind === 'dislike').length
  const like = reactions.filter(item => item.kind === 'like').length
  return { dislike, like }
}

// 유저가 클릭한 버튼 반환
export function getUserReaction(reactions: Reactions[], userId: string) {
  if (reactions.length === 0) return { kind: 'none' }
  const userReaction = reactions.filter(item => item.user_id === userId)
  return userReaction[0]
}
