import { useEffect, useMemo, useRef, useState } from 'react'
import { ListItem, type IconType } from './ListItem'
import { ListHeader } from './ListHeader'

import type { AccountItem } from '@/features/accountItem/index'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import dayjs from 'dayjs'

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  events: AccountItem[]
}

export const DateListOverlay = ({ isOpen, setIsOpen, events }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [entering, setEntering] = useState(false)
  const navigate = useNavigate()

  const minHeight = Math.round(window.innerHeight * 0.5)
  const maxHeight = Math.round(window.innerHeight * 0.9)
  const [height, setHeight] = useState<number>(minHeight)

  // 헤더 높이 측정
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerH, setHeaderH] = useState(0)
  useEffect(() => {
    setHeaderH(headerRef.current?.offsetHeight || 0)
    if (isOpen) setHeight(minHeight)
  }, [isOpen, minHeight])

  // 스크롤에 따라 시트 확장/축소
  const clamp = (v: number) => Math.max(minHeight, Math.min(maxHeight, v))

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const list = listRef.current
    if (!list) return

    const atTop = list.scrollTop <= 0
    const atBottom =
      Math.ceil(list.scrollTop + list.clientHeight) >= list.scrollHeight

    // 아래로 스크롤(deltaY > 0) → 확장
    if (e.deltaY > 0 && height < maxHeight && atBottom) {
      e.preventDefault()
      setHeight(h => clamp(h + e.deltaY))
      return
    }

    // 위로 스크롤(deltaY < 0) → 축소
    if (e.deltaY < 0 && height > minHeight && atTop) {
      e.preventDefault()
      setHeight(h => clamp(h + e.deltaY))
      return
    }
  }

  // 터치 동작
  const startYRef = useRef<number | null>(null)
  const startScrollTopRef = useRef<number>(0)

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startYRef.current = e.touches[0].clientY
    startScrollTopRef.current = listRef.current?.scrollTop || 0
  }
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startYRef.current === null) return
    const list = listRef.current
    if (!list) return

    const dy = startYRef.current - e.touches[0].clientY
    const atTop = list.scrollTop <= 0
    const atBottom =
      Math.ceil(list.scrollTop + list.clientHeight) >= list.scrollHeight

    if (dy > 0 && height < maxHeight && atBottom) {
      e.preventDefault()
      setHeight(h => clamp(h + dy))
    } else if (
      dy < 0 &&
      height > minHeight &&
      atTop &&
      startScrollTopRef.current <= 0
    ) {
      e.preventDefault()
      setHeight(h => clamp(h + dy))
    }
  }
  const handleTouchEnd = () => {
    startYRef.current = null
  }

  const { income, expense } = useMemo(() => {
    return events.reduce(
      (acc, item) => {
        if (item.type === 'income') {
          acc.income += Number(item.amount)
        } else {
          acc.expense += Number(item.amount)
        }
        return acc
      },
      {
        income: 0,
        expense: 0
      }
    )
  }, [events])

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
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[999] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              if (!entering) setIsOpen(false)
            }}
          />

          <motion.div
            className="fixed left-1/2 bottom-0 z-[1000] w-full max-w-[420px] -translate-x-1/2"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            onAnimationStart={() => setEntering(true)}
            onAnimationComplete={() => setEntering(false)}
            onPointerDown={e => e.stopPropagation()}>
            <motion.div
              ref={ref}
              className="w-full rounded-t-lg bg-white shadow-[0_-8px_24px_rgba(0,0,0,0.12)] overflow-hidden"
              animate={{ height }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}>
              <div ref={headerRef}>
                <ListHeader
                  income={income}
                  expense={expense}
                  setIsOpen={setIsOpen}
                />
              </div>

              <div
                ref={listRef}
                className="overflow-y-auto"
                style={{ height: Math.max(0, height - headerH) }}>
                {events.map(item => (
                  <ListItem
                    key={item.id}
                    recurring={!!item.recurring_rule_id}
                    installment={
                      item.installment_plans || {
                        months: 0,
                        start_date: '',
                        end_date: ''
                      }
                    }
                    icon={item.categories?.name as IconType}
                    amount={Number(item.amount)}
                    type={item.type}
                    gotoDetail={() =>
                      navigate(
                        `/accountBook/calendar/detail/${dayjs(item.date).format('YYYY-MM-DD')}/${item.id}`
                      )
                    }
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
