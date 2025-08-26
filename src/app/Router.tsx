import { createBrowserRouter } from 'react-router'
import { Layout } from '../shared/components/layout/Layout'
import { Home } from '../pages/Home'
import { CalendarPage } from '../pages/calendar'

import NotFound from '@/shared/components/notFound/NotFound'
import NotificationPage from '@/pages/notification/NotificationPage'
import { Test } from '@/pages/Test'
import dayjs from 'dayjs'
import { fetchByMonth } from '@/features/accountItem/index'

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
        Component: CalendarPage,
        loader: async ({ request }) => {
          const url = new URL(request.url)
          const dateParam = url.searchParams.get('date')
          const base = dateParam ? dayjs(dateParam) : dayjs()
          const events = await fetchByMonth(base.month())
          return { initialDate: base.startOf('day').toISOString(), events }
        }
      }
    ]
  },
  {
    path: '/notification',
    Component: Layout,
    children: [{ index: true, Component: NotificationPage }]
  },
  {
    path: '/test',
    Component: Layout,
    handle: {
      title: '테스트 페이지입니다',
      hideNav: true
    },
    children: [
      {
        index: true,
        Component: Test
      }
    ]
  },
  {
    path: '*',
    Component: Layout,
    children: [{ path: '*', Component: NotFound }]
  }
])
