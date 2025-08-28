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
{/*         {!isAuth ? (
          <Login />  임시 로그인 검증 삭제 => 만약 로그인 유저 정보가 필요하면 /login 으로 로그인 하시면 됩니다.
        ) : ( */}
          <>
            {headerTitle && <Header title={headerTitle} />}
            <main className={` ${hideNav ? '' : 'pb-[60px]'}`}>
              <div className="flex justify-end">
                {hideNav ? '' : <NotificationButton isActive={false} />}
              </div>
              <Outlet />
            </main>

            {!hideNav && <Nav />}
          </>
{/*         )} */}
      </div>
    </div>
  )
}
