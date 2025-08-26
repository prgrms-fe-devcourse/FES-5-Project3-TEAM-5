import { create } from 'zustand'

type Store = {
  date: Date
  setDate: (date: Date) => void
}

export const useSelectedDate = create<Store>(set => ({
  date: new Date(),
  setDate: (date: Date) => set({ date })
}))
