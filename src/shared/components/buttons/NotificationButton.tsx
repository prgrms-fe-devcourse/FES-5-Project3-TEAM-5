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
      <div className="absolute top-5 right-3">
        <Link to="/notification">
          {isActive ? <ActiveNotificationIcon /> : <NotificationIcon />}
        </Link>
      </div>
    </>
  )
}
export default NotificationButton
