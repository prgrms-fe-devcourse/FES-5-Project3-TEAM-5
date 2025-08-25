import { Outlet } from 'react-router'
import Navigatie from '../navigatie/Nav'
import Login from '@/pages/login/Login'
import { useState } from 'react'

export const Layout = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-dvh bg-zinc-100">
      <div className="mx-auto w-full max-w-[420px] min-h-dvh relative bg-white pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] overscroll-y-contain">
        {isLogin ? (
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
