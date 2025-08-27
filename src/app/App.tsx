import { RouterProvider } from 'react-router'
import { router } from './Router'
import Snackbar from '@/shared/components/snackbar/Snackbar'

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Snackbar />
    </>
  )
}

export default App
