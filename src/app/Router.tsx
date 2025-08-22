import { createBrowserRouter } from 'react-router'
import { Layout } from '../shared/components/layout/Layout'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        element: <div>Home</div>
      }
    ]
  }
])
