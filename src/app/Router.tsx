import { createBrowserRouter } from 'react-router'
import dayjs from 'dayjs'

// layouts
import { Layout } from '@/shared/components/layout/Layout'
import { AccountBookLayout } from '@/shared/components/layout/AccountBookLayout'

// pages
import Home from '@/pages/group/Home'
import LoginEntry from '@/pages/login/LoginEntry'
import More from '@/pages/more/More'
import { CalendarPage } from '@/pages/calendar'
import NotificationPage from '@/pages/notification/NotificationPage'
import VotePage from '@/pages/vote/VotePage'
import AddVotePage from '@/pages/vote/AddVotePage'
import EditVotePage from '@/pages/vote/EditVotePage'
import AddItem from '@/pages/item/add/AddItem'
import NotFound from '@/shared/components/notFound/NotFound'
import FAQPage from '@/pages/faq/page'
import NoticePage from '@/pages/notice/page'

// features & utils
import { fetchByMonth } from '@/features/accountItem'
import { useSelectedDate } from '@/features/calendar'
import PrivacyPage from '@/pages/privacy/Page'
import SettingPage from '@/pages/accountbook/SettingPage'
import CreateGroup from '@/pages/group/CreateGroup'
import DetailAccountItemPage from '@/pages/detail/DetailAccountItemPage'

import EditLayout from '@/features/group/edit/EditLayout'
import Edit from '@/features/group/edit/EditGroup'
import Invitation from '@/features/group/edit/invitation/Invitation'
import { StatisticsDetailPage, StatisticsPage } from '@/pages/statistics'
import { PlansOverview } from '@/pages/plan/PlansOverview'
import EditItem from '@/pages/item/edit/EditItem'

const getInitialDateForCalendar = (dateParam: string | null) => {
  if (dateParam) return dayjs(dateParam).startOf('day').toISOString()
  const selected = useSelectedDate.getState().date
  return dayjs(selected ?? new Date())
    .startOf('day')
    .toISOString()
}

const eventsLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url)
  const dateParam = url.searchParams.get('date')
  const initialDate = getInitialDateForCalendar(dateParam)

  const events = await fetchByMonth(
    dayjs(initialDate).year(),
    dayjs(initialDate).month(),
    localStorage.getItem('storageGroup') || ''
  )
  return { initialDate, events }
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
        path: 'add',
        Component: CreateGroup,
        handle: {
          title: '가계부 생성',
          hideNav: true
        }
      },
      {
        path: 'edit/:groupId',
        Component: EditLayout,
        handle: {
          title: '가계부 수정',
          hideNav: true
        },
        children: [
          {
            index: true,
            Component: Edit
          },
          {
            path: 'invite',
            Component: Invitation,
            handle: {
              title: '초대하기',
              hideNav: true
            }
          }
        ]
      },
      {
        path: 'accountBook/:groupId',
        Component: AccountBookLayout,
        children: [
          {
            path: 'calendar',
            Component: CalendarPage,
            loader: eventsLoader
          },

          {
            path: 'statistics',
            children: [
              { index: true, Component: StatisticsPage, loader: eventsLoader },
              {
                path: 'detail/:type',
                Component: StatisticsDetailPage,
                loader: eventsLoader
              }
            ]
          },
          {
            path: 'plan',
            Component: PlansOverview,
            loader: eventsLoader
          },
          {
            path: 'settings',
            Component: SettingPage
          }
        ]
      },
      {
        path: '/accountBook/:groupId/calendar/:id',
        Component: DetailAccountItemPage,
        handle: {
          hideNav: true
        }
      },
      {
        path: '/accountBook/:groupId/item',
        children: [
          {
            path: 'add',
            Component: AddItem,
            handle: {
              title: '가계부 작성',
              hideNav: true
            }
          }
        ]
      },
      {
        path: '/accountBook/item/:id/edit',
        Component: EditItem,
        handle: {
          title: '가계부 수정',
          hideNav: true
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
    path: '/vote',
    Component: Layout,
    children: [
      { index: true, Component: VotePage },
      {
        path: 'add',
        Component: AddVotePage,
        handle: { title: '투표 작성', hideNav: true }
      },
      {
        path: 'edit/:editId',
        Component: EditVotePage,
        handle: { title: '투표 수정', hideNav: true }
      }
    ]
  },

  {
    path: '/login',
    Component: Layout,
    children: [{ index: true, Component: LoginEntry }]
  },

  {
    path: '/more',
    Component: Layout,
    children: [
      { index: true, Component: More },
      {
        path: 'faq',
        handle: { title: '자주 묻는 질문', hideNav: true },

        children: [{ index: true, Component: FAQPage }]
      },

      {
        path: 'notice',
        handle: { title: '공지사항', hideNav: true },

        children: [{ index: true, Component: NoticePage }]
      },
      {
        path: 'privacy',
        handle: { title: '개인정보 처리방침', hideNav: true },
        children: [{ index: true, Component: PrivacyPage }]
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
        handle: { title: '404', hideNav: true }
      }
    ]
  }
])
