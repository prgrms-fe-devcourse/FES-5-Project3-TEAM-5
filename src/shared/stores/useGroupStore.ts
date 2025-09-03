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
  isLoading: boolean
  setGroups: (groups: Group[]) => void
  setMainGroupId: (id: string) => void
  fetchGroups: (userId: string) => Promise<void>
}

export const useGroupStore = create<GroupState>(set => ({
  groups: [],
  mainGroupId: null,
  isLoading: false,
  setGroups: groups => {
    const main = groups.find(g => g.is_main)
    set({ groups, mainGroupId: main?.groups.id || null })
  },

  setMainGroupId: id => set({ mainGroupId: id }),

  fetchGroups: async userId => {
    set({ isLoading: true })
    try {
      const data = await fetchGroupsByUser(userId)
      const main = data.find(g => g.is_main)

      set({
        groups: data,
        mainGroupId: main?.groups.id || null,
        isLoading: false //  완료 시 false
      })
    } catch (error) {
      console.error('fetchGroups error:', error)
      set({ isLoading: false }) //  실패 시도 꼭 false 해줘야 함
    }
  }
}))
