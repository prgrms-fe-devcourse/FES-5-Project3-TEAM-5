export type Users = {
  id: string
  email: string
  nickname: string
  created_at: string
}

export type GroupMembers = {
  id?: string | undefined
  group_id: string
  user_id?: string
  is_main: boolean
  created_at?: string

  groups?: {
    user_id: string
    is_personal: boolean
    name: string
    mascot: number
  } | null
}
