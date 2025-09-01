import { useEffect, useMemo, useRef, useState } from 'react'
import { ListItem, type IconType } from './ListItem'
import { ListHeader } from './ListHeader'

import type { AccountItem } from '@/features/accountItem/index'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  events: AccountItem[]
}

export const DateListOverlay = ({ isOpen, setIsOpen, events }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const [entering, setEntering] = useState(false)

  // const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (ref.current && !ref.current.contains(e.target as Node)) {
  //     setIsOpen(false)
  //   }
  // }

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
            onPointerDown={() => {
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
            <div
              ref={ref}
              className="w-full h-[50vh] rounded-t-lg bg-white shadow-[0_-8px_24px_rgba(0,0,0,0.12)]">
              <ListHeader
                income={income}
                expense={expense}
                setIsOpen={setIsOpen}
              />
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
                />
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
