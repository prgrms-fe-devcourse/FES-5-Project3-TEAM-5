import {
  ActiveNotificationIcon,
  NotificationIcon
} from '@/shared/assets/buttons/ButtonIcons'
import { Link } from 'react-router'

interface Props {
  isActive: boolean
}

function NotificationButton({ isActive }: Props) {
  return (
    <>
      <Link to="/notification">
        {isActive ? <ActiveNotificationIcon /> : <NotificationIcon />}
      </Link>
    </>
  )
}
export default NotificationButton
