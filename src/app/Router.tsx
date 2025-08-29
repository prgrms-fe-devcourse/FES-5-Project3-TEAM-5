import { createBrowserRouter } from 'react-router'
import { Layout } from '../shared/components/layout/Layout'
import Home from '@/pages/group/Home'
import PrivacyPage from '@/pages/privacy/Page'
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
import { useSelectedDate } from '@/features/calendar'
import FAQPage from '@/pages/faq/page'
import NoticePage from '@/pages/notice/page'

const getInitialDateForCalendar = (dateParam: string | null) => {
  if (dateParam) return dayjs(dateParam).startOf('day').toISOString()
  const selected = useSelectedDate.getState().date
  return dayjs(selected ?? new Date())
    .startOf('day')
    .toISOString()
}

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
              const initialDate = getInitialDateForCalendar(dateParam)
              const events = await fetchByMonth(dayjs(initialDate).month())
              return { initialDate, events }
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
                  const initialDate = getInitialDateForCalendar(dateParam)
                  const events = await fetchByMonth(dayjs(initialDate).month())
                  return { events }
                }
              },
              {
                path: 'detail/:type',
                Component: StatisticsDetailPage,
                loader: async ({ request }) => {
                  const url = new URL(request.url)
                  const dateParam = url.searchParams.get('date')
                  const initialDate = getInitialDateForCalendar(dateParam)
                  const events = await fetchByMonth(dayjs(initialDate).month())
                  return { events }
                }
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
      },
      {
        path: 'faq',
        Component: FAQPage,
        handle: {
          title: '자주 묻는 질문',
          hideNav: false
        }
      },
      {
        path: 'privacy',
        Component: PrivacyPage,
        handle: {
          title: '개인정보처리방침',
          hideNav: false
        }
      },
      {
        path: 'notice',
        Component: NoticePage,
        handle: {
          title: '공지사항',
          hideNav: false
        }
      }
    ]
  }
])
