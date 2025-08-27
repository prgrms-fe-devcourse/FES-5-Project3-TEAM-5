import { create } from 'zustand'

interface SnackbarState {
  visible: boolean
  text: string
  type: 'success' | 'error'
  duration: number
  showSnackbar: (payload: {
    text: string
    type: 'success' | 'error'
    duration?: number
  }) => void
  hideSnackbar: () => void
}

export const useSnackbarStore = create<SnackbarState>(set => ({
  visible: false,
  text: '',
  type: 'success',
  duration: 2000,
  showSnackbar: ({ text, type, duration = 2000 }) => {
    set({ visible: true, text, type, duration })
    setTimeout(() => set({ visible: false }), duration)
  },
  hideSnackbar: () => set({ visible: false })
}))
