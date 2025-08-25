import { createBrowserRouter } from 'react-router'
import { Layout } from '../shared/components/layout/Layout'
import { Home } from '../pages/Home'
import CalendarPage from '../pages/calendar/ui/page'
import NotFound from '@/shared/components/notFound/NotFound'
import NotificationPage from '@/pages/notification/NotificationPage'
import VotePage from '@/pages/vote/VotePage'
import CreateVotePage from '@/pages/vote/CreateVotePage'
import EditVotePage from '@/pages/vote/EditVotePage'

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
    path: '/notification',
    Component: Layout,
    children: [{ index: true, Component: NotificationPage }]
  },
  {
    path: '/vote',
    Component: Layout,
    children: [
      { index: true, Component: VotePage },
      {
        path: 'create',
        Component: CreateVotePage
      },
      {
        path: 'edit/:editId',
        Component: EditVotePage
      }
    ]
  },
  {
    path: '*',
    Component: Layout,
    children: [{ path: '*', Component: NotFound }]
  }
])
