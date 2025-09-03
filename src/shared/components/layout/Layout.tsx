import { Outlet, useMatches } from 'react-router'
import Nav from '../nav/Nav'
// import NotificationButton from '../buttons/NotificationButton'
import Header from '../header/Header'
// import Login from '@/pages/login/Login'
import { useEffect } from 'react'
import { useUserStore } from '@/shared/stores/useUserStore'
import { useShallow } from 'zustand/shallow'
import Login from '@/pages/login/Login'
import supabase from '@/supabase/supabase'
import { useSnackbarStore } from '@/shared/stores/useSnackbarStore'

type RouteHandle = {
  title?: string
  hideNav?: boolean
}

export const Layout = () => {
  const { isAuth, initializeUser, isLoading } = useUserStore(
    useShallow(state => ({
      isAuth: state.isAuth,
      initializeUser: state.initializeUser,
      isLoading: state.isLoading
    }))
  )

  const showSnackbar = useSnackbarStore(state => state.showSnackbar)

  useEffect(() => {
    const justLoggedIn = localStorage.getItem('just-logged-in')
    if (justLoggedIn) {
      showSnackbar({ text: '로그인 되었습니다', type: 'success' })
      localStorage.removeItem('just-logged-in')
    }
  }, [])

  useEffect(() => {
    initializeUser()
  }, [initializeUser])

  // 탭 가시성 변경 시 자동갱신 제어 + 즉시 세션 동기화
  useEffect(() => {
    const onVisible = async () => {
      if (document.visibilityState === 'visible') {
        supabase.auth.startAutoRefresh()
        await supabase.auth.getSession()
      } else {
        supabase.auth.stopAutoRefresh()
      }
    }
    onVisible()
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [])

  // 포커스/온라인 전환 시 즉시 동기화
  useEffect(() => {
    const sync = () => supabase.auth.getSession()
    window.addEventListener('focus', sync)
    window.addEventListener('online', sync)
    return () => {
      window.removeEventListener('focus', sync)
      window.removeEventListener('online', sync)
    }
  }, [])

  const matches = useMatches() as Array<{ handle?: RouteHandle }>

  const headerTitle = [...matches].reverse().find(m => m.handle?.title)?.handle
    ?.title as string | undefined
  const hideNav = matches.some(m => m.handle?.hideNav)

  return (
    <div className="min-h-dvh bg-zinc-100">
      <div className="mx-auto w-full max-w-[420px] min-h-dvh relative bg-white pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] overscroll-y-contain">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : !isAuth ? (
          <Login />
        ) : (
          <>
            {headerTitle && <Header title={headerTitle} />}
            <main className={` ${hideNav ? '' : 'pb-[60px]'}`}>
              <div className="flex justify-end relative">
                {/* {hideNav ? '' : <NotificationButton isActive={false} />} */}
              </div>
              <Outlet />
            </main>

            {!hideNav && <Nav />}
          </>
        )}
      </div>
    </div>
  )
}
