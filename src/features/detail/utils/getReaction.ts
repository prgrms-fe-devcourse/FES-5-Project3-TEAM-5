import type { Reactions } from '../model/responseBody'

// 좋아요, 싫어요 버튼 수 카운트
export function getReactionCount(reactions: Reactions[]) {
  if (!reactions) return { dislike: 0, like: 0 }
  const dislikeCount = reactions.filter(item => item.kind === 'dislike').length
  const likeCount = reactions.filter(item => item.kind === 'like').length
  return { dislikeCount, likeCount }
}

// 유저가 클릭한 버튼 반환
export function getUserReaction(reactions: Reactions[], userId: string) {
  return reactions.find(item => item.user_id === userId) ?? { kind: 'none' }
}
