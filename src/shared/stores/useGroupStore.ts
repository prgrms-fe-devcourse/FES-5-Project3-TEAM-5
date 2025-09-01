import { create } from 'zustand'

interface Group {
  id: string
  name: string
  mascot: number
  is_main: boolean
}

interface GroupState {
  groups: Group[]
  mainGroupId: string | null
  setGroups: (groups: Group[]) => void
  setMainGroupId: (id: string) => void
}

export const useGroupStore = create<GroupState>(set => ({
  groups: [],
  mainGroupId: null,
  setGroups: groups => {
    const main = groups.find(g => g.is_main)
    set({ groups, mainGroupId: main?.id || null })
  },
  setMainGroupId: id => set({ mainGroupId: id })
}))
