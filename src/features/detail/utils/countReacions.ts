// export interface Reactions {
//   id: string
//   kind: string
// }

import type { Reactions } from '../model/responseBody'

export function getReactionCount(reactions: Reactions[]) {
  const dislike = reactions.filter(item => item.kind === 'dislike').length
  const like = reactions.filter(item => item.kind === 'like').length
  return { dislike, like }
}
