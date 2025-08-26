// stores/useUserStore.ts
import { create } from 'zustand'
import supabase from '@/supabase/supabase'
import type { User } from '@supabase/supabase-js'

interface UserStore {
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

  logout: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error('로그아웃 실패')
    }
    set({ user: null, isAuth: false })
    console.log('✅ 로그아웃 성공')
  },

  initializeUser: async () => {
    set({ isLoading: true })
    const {
      data: { session }
    } = await supabase.auth.getSession()
    const currentUser = session?.user ?? null

    set({
      user: currentUser,
      isAuth: !!currentUser,
      isLoading: false
    })

    if (currentUser) {
      await get().getUserData(currentUser)
    }

    // Supabase auth 변화 감지
    supabase.auth.onAuthStateChange(async (event, session) => {
      const newUser = session?.user ?? null
      set({ user: newUser, isAuth: !!newUser })

      if (newUser && event === 'INITIAL_SESSION') {
        await get().insertUserIfNotExists(newUser)
      }

      if (newUser) {
        await get().getUserData(newUser)
      }

      set({ isLoading: false })
    })
  },

  getUserData: async (user: User) => {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('id', user.id)
      .single()
    if (error) {
      console.error('유저 정보 불러오기 실패:', error)
    } else {
      console.log('✅ 유저 데이터:', data)
    }
  },

  insertUserIfNotExists: async (user: User) => {
    const { data: existing, error: selectError } = await supabase
      .from('users')
      .select('id')
      .eq('id', user.id)
      .maybeSingle()

    if (selectError) {
      console.error('기존 사용자 조회 실패:', selectError)
      return
    }

    if (existing) return

    const { user_name, email, name } = user.user_metadata
    const nickname = user_name || name

    const { error: insertError } = await supabase.from('users').upsert({
      id: user.id,
      email,
      nickname
    })

    if (insertError) {
      console.error('유저 insert 실패:', insertError)
    }
  }
}))
