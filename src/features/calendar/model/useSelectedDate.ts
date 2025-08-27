import { create } from 'zustand'

type Store = {
  date: Date
  amountList: {
    income: number
    expense: number
    balance: number
  }
  setAmountList: (amountList: {
    income: number
    expense: number
    balance: number
  }) => void
  setDate: (date: Date) => void
}

export const useSelectedDate = create<Store>(set => ({
  date: new Date(),
  amountList: {
    income: 0,
    expense: 0,
    balance: 0
  },
  setAmountList: (amountList: {
    income: number
    expense: number
    balance: number
  }) => set({ amountList }),
  setDate: (date: Date) => set({ date })
}))
