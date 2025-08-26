import { createBrowserRouter } from 'react-router'
import { Layout } from '../shared/components/layout/Layout'
import { Home } from '../pages/Home'
import CalendarPage from '../pages/calendar/ui/page'
import Login from '@/pages/login/Login'
import More from '@/pages/more/More'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home
      }
    ]
  },
  {
    path: '/accountBook',
    Component: Layout,
    children: [
      {
        path: 'calendar',
        Component: CalendarPage
      }
    ]
  },
  {
    path: '/login',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Login
      }
    ]
  },
  {
    path: '/more',
    Component: Layout,
    children: [
      {
        index: true,
        Component: More
      }
    ]
  }
])
