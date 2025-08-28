import { createBrowserRouter } from 'react-router'
import { Layout } from '../shared/components/layout/Layout'
import Home from '@/pages/group/Home'

import Login from '@/pages/login/Login'
import More from '@/pages/more/More'
import { CalendarPage } from '../pages/calendar'

import NotFound from '@/shared/components/notFound/NotFound'
import NotificationPage from '@/pages/notification/NotificationPage'
import VotePage from '@/pages/vote/VotePage'
import EditVotePage from '@/pages/vote/EditVotePage'
import AddItem from '@/pages/item/add/AddItem'

import dayjs from 'dayjs'
import { fetchByMonth } from '@/features/accountItem/index'

import AddVotePage from '@/pages/vote/AddVotePage'
import { AccountBookLayout } from '@/shared/components/layout/AccountBookLayout'
import StatisticsPage from '@/pages/statistics/StatisticsPage'
import StatisticsDetailPage from '@/pages/statistics/StatisticsDetailPage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'accountBook',
        Component: AccountBookLayout,
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
          },
          {
            path: 'statistics',
            children: [
              {
                index: true,
                Component: StatisticsPage,
                loader: async ({ request }) => {
                  const url = new URL(request.url)
                  const dateParam = url.searchParams.get('date')
                  const base = dateParam ? dayjs(dateParam) : dayjs()
                  const events = await fetchByMonth(base.month())
                  return { events }
                }
              },
              {
                path: 'detail/:type',
                Component: StatisticsDetailPage
              }
            ]
          },
          {
            path: 'settings',
            Component: () => {
              return <div>settings</div>
            }
          }
        ]
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
        path: 'add',
        Component: AddVotePage,
        handle: {
          title: '투표 작성',
          hideNav: true
        }
      },
      {
        path: 'edit/:editId',
        Component: EditVotePage,
        handle: {
          title: '투표 수정',
          hideNav: true
        }
      }
    ]
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
        Component: AddItem
      }
    ]
  },
  {
    path: '*',
    Component: Layout,
    children: [
      {
        path: '*',
        Component: NotFound,
        handle: {
          title: '404',
          hideNav: true
        }
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
