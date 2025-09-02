import { create } from 'zustand'

interface StorageGroup {
  storageGroup: string
  getStorageGroup: () => string
  setStorageGroup: (storageGroup: string) => void
  clearStorageGroup: () => void
}

export const useStorageGroup = create<StorageGroup>(set => ({
  storageGroup: '',
  getStorageGroup: () => localStorage.getItem('storageGroup') || '',
  setStorageGroup: (storageGroup: string) => {
    if (localStorage.getItem('storageGroup')) {
      localStorage.removeItem('storageGroup')
    }
    localStorage.setItem('storageGroup', storageGroup)
    set({ storageGroup: storageGroup })
  },
  clearStorageGroup: () => {
    localStorage.removeItem('storageGroup')
    set({ storageGroup: '' })
  }
}))
