export interface ReactionTable {
  item_id: string
  user_id: string
  kind: string
}

export interface AddCommentTable {
  item_id: string
  user_id: string
  content: string
}
export interface EditCommentTable {
  id: string
  item_id: string
  user_id: string
  content: string
}
