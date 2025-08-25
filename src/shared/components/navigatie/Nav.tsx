import { NavLink } from 'react-router'
import { BookIcon, HomeIcon, MoreIcon, VoteIcon } from './icons'
import { tw } from '@/shared/utils/tw'

function Navigatie() {
  const items = [
    { to: '/', label: '홈', Icon: HomeIcon },
    { to: '/accountBook', label: '가계부', Icon: BookIcon },
    { to: '/vote', label: '투표', Icon: VoteIcon },
    { to: '/more', label: '더보기', Icon: MoreIcon }
  ]

  return (
    <nav
      aria-label="하단 내비게이션"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] h-[60px] border-t border-t-neutral-light bg-white">
      <ul className="flex">
        {items.map(({ to, label, Icon }) => (
          <li
            key={to}
            className="flex-1">
            <NavLink
              to={to}
              aria-label={label}
              className={({ isActive }) =>
                tw(
                  'flex flex-col items-center py-2 gap-1 transition-colors duration-100',
                  isActive
                    ? 'text-primary-base'
                    : 'text-neutral-dark hover:bg-neutral-100'
                )
              }>
              <Icon
                className="w-6 h-6"
                aria-hidden="true"
              />
              <span className="text-size-md leading-4">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
export default Navigatie
