import { Outlet } from 'react-router'
import Navigatie from '../navigatie/Nav'

export const Layout = () => {
  return (
    <div className="min-h-dvh bg-zinc-100">
      <div className="mx-auto w-full max-w-[420px] min-h-dvh bg-white pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] overscroll-y-contain">
        <main className="pb-[60px]">
          <Outlet />
        </main>
        <Navigatie />
      </div>
    </div>
  )
}
