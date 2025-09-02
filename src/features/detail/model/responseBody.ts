import type { AccountItem } from '@/features/accountItem'

interface Writer {
  id: string
  nickname: string
}
export interface Reactions {
  id: string
  kind: string
}

export interface Comments {
  id: string
  item_id: string
  user_id: string
  content: string
  created_at: string
  users: Writer
}

export interface DetailAccountItem extends AccountItem {
  users: Writer
  reactions: Reactions[]
}
