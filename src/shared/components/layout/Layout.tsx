import { Outlet, useMatches } from 'react-router'
import Nav from '../nav/Nav'
import NotificationButton from '../buttons/NotificationButton'
import Header from '../header/Header'

type RouteHandle = {
  title?: string
  hideNav?: boolean
}

export const Layout = () => {
  const matches = useMatches() as Array<{ handle?: RouteHandle }>

  const headerTitle = [...matches].reverse().find(m => m.handle?.title)?.handle
    ?.title as string | undefined
  const hideNav = matches.some(m => m.handle?.hideNav)

  return (
    <div className="min-h-dvh bg-zinc-100">
      <div className="mx-auto w-full max-w-[420px] min-h-dvh bg-white pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] overscroll-y-contain">
        {headerTitle && <Header title={headerTitle} />}
        <main className={`p-4 ${hideNav ? '' : 'pb-[60px]'}`}>
          <div className="flex justify-end">
            {hideNav ? '' : <NotificationButton isActive={false} />}
          </div>
          <Outlet />
        </main>

        {!hideNav && <Nav />}
      </div>
    </div>
  )
}
