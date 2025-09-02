import * as React from 'react'

import { Button } from '@/shared/components/shadcn/ui/button'
import { Calendar } from '@/shared/components/shadcn/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/shared/components/shadcn/ui/popover'
import { useSelectedDate } from '../model/useSelectedDate'
import { useShallow } from 'zustand/shallow'
import dayjs from 'dayjs'
import { useLocation, useNavigate } from 'react-router'
import { tw } from '@/shared/utils/tw'
import { useStorageGroup } from '@/features/group/model/useStorageGroup'

interface Props {
  isSliding: boolean
}

export function PickDate({ isSliding }: Props) {
  const [open, setOpen] = React.useState(false)

  const [date, setDate, resetDate] = useSelectedDate(
    useShallow(s => [s.date, s.setDate, s.resetDate])
  )
  const navigate = useNavigate()
  const location = useLocation()

  const getStorageGroup = useStorageGroup(state => state.getStorageGroup)
  const storageGroup = getStorageGroup()
  const isStatistics = location.pathname.includes(
    `/accountBook/${storageGroup}/statistics`
  )

  const isCalendar = location.pathname.includes(
    `/accountBook/${storageGroup}/calendar`
  )

  const shouldSyncQuery = isCalendar || isStatistics

  const navigateWithDate = (d: Date) => {
    setDate(d)
    if (shouldSyncQuery) {
      navigate(
        {
          pathname: location.pathname,
          search: `?date=${dayjs(d).format('YYYY-MM-DD')}`
        },
        { replace: true }
      )
    }
  }

  return (
    <div
      className={tw(
        ' w-full  flex justify-between border-none items-center',
        isSliding && 'px-6'
      )}>
      {isSliding && (
        <button
          className="group text-3xl font-bold cursor-pointer"
          onClick={() => {
            const prev = new Date(date)
            prev.setMonth(prev.getMonth() - 1)
            navigateWithDate(prev)
          }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 6L9 12L15 18"
              className="stroke-[#33363F] group-hover:stroke-primary-light transition-colors"
              strokeWidth="2"
            />
          </svg>
        </button>
      )}
      <div className="relative flex-1 flex justify-center">
        <Popover
          open={open}
          onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              id="date"
              className="text-size-lg font-bold justify-center p-0">
              {date ? date.toLocaleDateString() : '날짜 선택'}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              defaultMonth={date}
              onSelect={nextDate => {
                if (nextDate) {
                  navigateWithDate(nextDate as Date)
                }
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
        {isSliding && (
          <Button
            variant="ghost"
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onClick={() => {
              navigateWithDate(new Date())
              resetDate()
            }}>
            오늘
          </Button>
        )}
      </div>
      {isSliding && (
        <button
          className="group text-3xl font-bold cursor-pointer"
          onClick={() => {
            const next = new Date(date)
            next.setMonth(next.getMonth() + 1)
            navigateWithDate(next)
          }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 6L15 12L9 18"
              className="stroke-[#33363F] group-hover:stroke-primary-light transition-colors"
              strokeWidth="2"
            />
          </svg>
        </button>
      )}
    </div>
  )
}
