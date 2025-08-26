import React, { useEffect, useRef } from 'react'
import { ListItem } from './ListItem'
import { ListHeader } from './ListHeader'

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const DateListOverlay = ({ isOpen, setIsOpen }: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }

  // 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null
  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/50 flex justify-center"
      onClick={handleClick}>
      <div className="relative h-full w-full max-w-[420px] flex items-end">
        <div
          ref={ref}
          className="w-full h-2/3 rounded-t-lg bg-white shadow-[0_-8px_24px_rgba(0,0,0,0.12)]">
          <ListHeader />
          <ListItem
            icon="beauty"
            title="월급소득"
          />
          <ListItem
            icon="clothes"
            title="옷"
          />
          <ListItem
            icon="cultural"
            title="문화"
          />
          <ListItem
            icon="dailyNecessities"
            title="생필품"
          />
        </div>
      </div>
    </div>
  )
}
