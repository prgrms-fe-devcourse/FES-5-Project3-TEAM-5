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

export function PickDate() {
  const [open, setOpen] = React.useState(false)

  const [date, setDate] = useSelectedDate(useShallow(s => [s.date, s.setDate]))
  const navigate = useNavigate()
  const location = useLocation()
  const isCalendar = location.pathname.includes('/accountBook/calendar')

  return (
    <div className=" w-full px-6 flex justify-between border-none items-center">
      <button
        className="group text-3xl font-bold cursor-pointer"
        onClick={() => {
          setDate(new Date(date.setMonth(date.getMonth() - 1)))
          if (isCalendar) {
            navigate(
              `/accountBook/calendar?date=${dayjs(date).format('YYYY-MM-DD')}`
            )
          } else {
            navigate(
              `/accountBook/statistics?date=${dayjs(date).format('YYYY-MM-DD')}`
            )
          }
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
      <Popover
        open={open}
        onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            id="date"
            className="w-32 text-size-lg font-bold justify-center">
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
            onSelect={date => {
              setDate(date as Date)
              if (isCalendar) {
                navigate(
                  `/accountBook/calendar?date=${dayjs(date).format('YYYY-MM-DD')}`
                )
              } else {
                navigate(
                  `/accountBook/statistics?date=${dayjs(date).format('YYYY-MM-DD')}`
                )
              }
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
      <button
        className="group text-3xl font-bold cursor-pointer"
        onClick={() => {
          setDate(new Date(date.setMonth(date.getMonth() + 1)))
          if (isCalendar) {
            navigate(
              `/accountBook/calendar?date=${dayjs(date).format('YYYY-MM-DD')}`
            )
          } else {
            navigate(
              `/accountBook/statistics?date=${dayjs(date).format('YYYY-MM-DD')}`
            )
          }
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
    </div>
  )
}
