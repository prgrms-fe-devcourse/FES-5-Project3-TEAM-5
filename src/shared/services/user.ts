import supabase from '@/supabase/supabase'
import type { User } from '@supabase/supabase-js'
import type { StateCreator } from 'zustand'
import type { UserStore } from '../stores/useUserStore'
import { useSnackbarStore } from '../stores/useSnackbarStore'

export const getUserData = async (user: User) => {
  const { error } = await supabase
    .from('users')
    .select()
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('유저 정보 불러오기 실패:', error)
  }
}

export const insertUserIfNotExists = async (user: User) => {
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

export const initializeUser = async (
  set: Parameters<StateCreator<UserStore>>[0],
  get: Parameters<StateCreator<UserStore>>[1]
) => {
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
}

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error('로그아웃 실패')
  }
}
