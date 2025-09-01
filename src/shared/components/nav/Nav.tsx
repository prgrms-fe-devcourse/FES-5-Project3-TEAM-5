import { NavLink } from 'react-router'
import { BookIcon, HomeIcon, MoreIcon, VoteIcon } from './icons'
import { tw } from '@/shared/utils/tw'
import { useStorageGroup } from '@/features/group/model/useStorageGroup'
import { useSnackbarStore } from '@/shared/stores/useSnackbarStore'

function Nav() {
  const getStorageGroup = useStorageGroup(state => state.getStorageGroup)
  const showSnackbar = useSnackbarStore(state => state.showSnackbar)

  const storageGroup = getStorageGroup()
  const items = [
    { to: '/', label: '홈', Icon: HomeIcon },
    {
      to: `${storageGroup ? `/accountBook/${storageGroup}/calendar` : '/'}`,
      label: '가계부',
      Icon: BookIcon
    },
    { to: '/vote', label: '투표', Icon: VoteIcon },
    { to: '/more', label: '더보기', Icon: MoreIcon }
  ]

  return (
    <nav
      aria-label="하단 내비게이션"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] h-[60px] border-t border-t-neutral-light bg-white z-999">
      <ul className="flex">
        {items.map(({ to, label, Icon }) => {
          const isBook = label === '가계부'
          const disabled = isBook && !storageGroup

          return (
            <li
              key={to}
              className="flex-1">
              <NavLink
                to={to}
                aria-label={label}
                aria-disabled={disabled}
                onClick={
                  disabled
                    ? e => {
                        e.preventDefault()
                        showSnackbar({
                          text: '그룹을 먼저 선택해 주세요',
                          type: 'error'
                        })
                      }
                    : undefined
                }
                className={({ isActive }) =>
                  tw(
                    'flex flex-col items-center py-2 gap-1 transition-colors duration-100',
                    disabled
                      ? 'text-neutral-light cursor-not-allowed'
                      : isActive
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
          )
        })}
      </ul>
    </nav>
  )
}
export default Nav
