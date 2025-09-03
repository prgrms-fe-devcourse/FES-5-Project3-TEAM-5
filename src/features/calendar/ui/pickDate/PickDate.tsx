import * as React from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useShallow } from 'zustand/shallow'

import dayjs from 'dayjs'
import { tw } from '@/shared/utils/tw'

import { Button } from '@/shared/components/shadcn/ui/button'
import { Calendar } from '@/shared/components/shadcn/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/shared/components/shadcn/ui/popover'
import { useSelectedDate } from '../../model/useSelectedDate'

import { useStorageGroup } from '@/features/group/model/useStorageGroup'
import { SlideBtn } from './SlideBtn'

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

  const selectedDate = date ? date.toLocaleDateString() : '날짜 선택'

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

  const handlePrev = () => {
    const prev = new Date(date)
    prev.setMonth(prev.getMonth() - 1)
    navigateWithDate(prev)
  }

  const handleNext = () => {
    const next = new Date(date)
    next.setMonth(next.getMonth() + 1)
    navigateWithDate(next)
  }

  const isToday = dayjs(date).isSame(dayjs(), 'day')

  return (
    <div className={tw('w-full border-none', isSliding && 'px-6')}>
      <div className="w-full h-10 grid grid-cols-[1fr_auto_1fr] items-center">
        <div className="flex items-center">
          {isSliding && (
            <SlideBtn
              onClick={handlePrev}
              type="prev"
            />
          )}
        </div>

        <div className="justify-self-center">
          <Popover
            open={open}
            onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                id="date"
                className="text-size-lg font-bold p-0">
                {selectedDate}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start">
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                fromYear={2000}
                toYear={2100}
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
        </div>

        <div className="flex items-center gap-2 justify-self-end">
          {isSliding && !isToday && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => {
                navigateWithDate(new Date())
                resetDate()
              }}>
              오늘
            </Button>
          )}
          {isSliding && (
            <SlideBtn
              onClick={handleNext}
              type="next"
            />
          )}
        </div>
      </div>
    </div>
  )
}
