import { create } from 'zustand'
import { fetchGroupsByUser } from '../services/group'

export interface Group {
  group_id: string
  is_main: boolean
  groups: {
    id: string
    user_id: string
    name: string
    mascot: number
    is_personal: boolean
  }
}

interface GroupState {
  groups: Group[]
  mainGroupId: string | null
  setGroups: (groups: Group[]) => void
  setMainGroupId: (id: string) => void
  fetchGroups: (userId: string) => Promise<void>
}

export const useGroupStore = create<GroupState>(set => ({
  groups: [],
  mainGroupId: null,
  setGroups: groups => {
    const main = groups.find(g => g.is_main)
    set({ groups, mainGroupId: main?.groups.id || null })
  },

  setMainGroupId: id => set({ mainGroupId: id }),

  fetchGroups: async userId => {
    const data = await fetchGroupsByUser(userId)
    const main = data.find(g => g.is_main)

    set({
      groups: data,
      mainGroupId: main?.groups.id || null
    })
  }
}))
