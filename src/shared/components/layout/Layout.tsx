import { Outlet, useMatches } from 'react-router'
import Nav from '../nav/Nav'
import NotificationButton from '../buttons/NotificationButton'
import Header from '../header/Header'
import Login from '@/pages/login/Login'
import { useEffect } from 'react'
import { useUserStore } from '@/shared/stores/useUserStore'
import { useShallow } from 'zustand/shallow'

type RouteHandle = {
  title?: string
  hideNav?: boolean
}

export const Layout = () => {
  const { isAuth, initializeUser } = useUserStore(
    useShallow(state => ({
      isAuth: state.isAuth,
      initializeUser: state.initializeUser
    }))
  )

  useEffect(() => {
    initializeUser()
  }, [initializeUser])

  const matches = useMatches() as Array<{ handle?: RouteHandle }>

  const headerTitle = [...matches].reverse().find(m => m.handle?.title)?.handle
    ?.title as string | undefined
  const hideNav = matches.some(m => m.handle?.hideNav)

  return (
    <div className="min-h-dvh bg-zinc-100">
      <div className="mx-auto w-full max-w-[420px] min-h-dvh relative bg-white pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] overscroll-y-contain">
        {!isAuth ? (
          <Login />
        ) : (
          <>
            {headerTitle && <Header title={headerTitle} />}
            <main className={` ${hideNav ? '' : 'pb-[60px]'} relative`}>
              <div className="absolute right-4 top-6">
                <NotificationButton isActive={false} />
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
