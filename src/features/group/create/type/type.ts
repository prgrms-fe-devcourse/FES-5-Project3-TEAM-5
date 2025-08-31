import type { UUID } from 'crypto'

export type Users = {
  id: string
  email: string
  nickname: string
  created_at: string
}

export type Group = {
  id: UUID
  name: string
  mascot: string
  user_id: UUID
  created_at: string
  is_main: boolean
  is_personal: boolean
}
