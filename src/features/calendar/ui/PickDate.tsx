import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'

import { Button } from '@/shared/components/shadcn/ui/button'
import { Calendar } from '@/shared/components/shadcn/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/shared/components/shadcn/ui/popover'
import { useSelectedDate } from '../model/useSelectedDate'
import { useShallow } from 'zustand/shallow'

export function PickDate() {
  const [open, setOpen] = React.useState(false)

  const [date, setDate] = useSelectedDate(useShallow(s => [s.date, s.setDate]))

  return (
    <div className="flex flex-col gap-3 border-none">
      <Popover
        open={open}
        onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            id="date"
            className="w-32 text-size-lg font-bold justify-between">
            {date ? date.toLocaleDateString() : '날짜 선택'}
            <ChevronDownIcon />
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
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
