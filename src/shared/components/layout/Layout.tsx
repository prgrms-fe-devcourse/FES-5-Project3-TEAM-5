import { Outlet } from 'react-router'
import Nav from '../nav'

export const Layout = () => {
  return (
    <div className="min-h-dvh bg-zinc-100">
      <div className="mx-auto w-full max-w-[420px] min-h-dvh bg-white pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] overscroll-y-contain">
        <main className="p-4 pb-[60px]">
          <Outlet />
        </main>

        <Nav />
      </div>
    </div>
  )
}
