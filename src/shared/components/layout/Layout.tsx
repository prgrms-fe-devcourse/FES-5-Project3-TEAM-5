import { Outlet } from 'react-router'
import Navigatie from '../navigatie/Nav'
import Login from '@/pages/login/Login'
import { useEffect } from 'react'
import { useUserStore } from '@/shared/stores/useUserStore'

export const Layout = () => {
  const { isAuth, initializeUser } = useUserStore()

  useEffect(() => {
    initializeUser()
  }, [initializeUser])

  return (
    <div className="min-h-dvh bg-zinc-100">
      <div className="mx-auto w-full max-w-[420px] min-h-dvh relative bg-white pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] overscroll-y-contain">
        {!isAuth ? (
          <Login />
        ) : (
          <>
            <main className="p-4 pb-[60px]">
              <Outlet />
            </main>

            <Navigatie />
          </>
        )}
      </div>
    </div>
  )
}
