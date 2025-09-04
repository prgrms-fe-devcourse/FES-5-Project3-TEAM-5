import { create } from 'zustand'

type SnackbarType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: string
  text: string
  type: SnackbarType
  duration: number
}

interface SnackbarState {
  toasts: Toast[]
  showSnackbar: (payload: {
    text: string
    type: SnackbarType
    duration?: number
  }) => void
  hideSnackbar: (id: string) => void
  clear: () => void
}

export const useSnackbarStore = create<SnackbarState>((set, get) => ({
  toasts: [],
  showSnackbar: ({ text, type, duration = 2500 }) => {
    const existing = get().toasts.find(t => t.text === text && t.type === type)
  if (existing) return // 동일한 메시지가 이미 있음 → 추가하지 않음
  
    const id = crypto?.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`
    const toast: Toast = { id, text, type, duration }
    set(state => ({ toasts: [toast] }))
    // auto hide
    window.setTimeout(() => {
      const { hideSnackbar } = get()
      hideSnackbar(id)
    }, duration)
  },
  hideSnackbar: id =>
    set(state => ({ toasts: state.toasts.filter(t => t.id !== id) })),
  clear: () => set({ toasts: [] })
}))
