import { PickDate } from '@/features/calendar'
import { tw } from '@/shared/utils/tw'
import { NavLink, Outlet } from 'react-router'

export const AccountBookLayout = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-between items-center">
        <PickDate />
        <div className="w-full flex gap-2 justify-between">
          <NavLink
            className={({ isActive }) =>
              tw(
                'flex-1 py-1.5 text-center',
                isActive &&
                  'text-primary-base font-bold border-b-3 border-primary-base'
              )
            }
            to="calendar">
            달력
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              tw(
                'flex-1 py-1.5 text-center',
                isActive &&
                  'text-primary-base font-bold border-b-3 border-primary-base'
              )
            }
            to="statistics">
            통계
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              tw(
                'flex-1 py-1.5 text-center',
                isActive &&
                  'text-primary-base font-bold border-b-3 border-primary-base'
              )
            }
            to="settings">
            설정
          </NavLink>
        </div>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  )
}
