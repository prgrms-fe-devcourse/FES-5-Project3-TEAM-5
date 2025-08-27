// stores/useUserStore.ts
import { create } from 'zustand'
import type { User } from '@supabase/supabase-js'
import {
  getUserData,
  insertUserIfNotExists,
  initializeUser,
  logoutUser
} from '@/shared/services/user'

export interface UserStore {
  user: User | null
  isLoading: boolean
  isAuth: boolean
  setUser: (user: User | null) => void
  logout: () => Promise<void>
  initializeUser: () => Promise<void>
  getUserData: (user: User) => Promise<void>
  insertUserIfNotExists: (user: User) => Promise<void>
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  isLoading: true,
  isAuth: false,

  setUser: user => {
    set({
      user,
      isAuth: !!user
    })
  },

  initializeUser: () => initializeUser(set, get),
  getUserData,
  insertUserIfNotExists,

  logout: async () => {
    await logoutUser()
    set({ user: null, isAuth: false })
  }
}))
