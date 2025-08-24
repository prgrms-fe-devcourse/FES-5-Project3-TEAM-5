import { createBrowserRouter } from 'react-router'
import { Layout } from '../shared/components/layout/Layout'
import { Home } from '../pages/Home'
import CalendarPage from '../pages/calendar/ui/page'

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
  }
])
