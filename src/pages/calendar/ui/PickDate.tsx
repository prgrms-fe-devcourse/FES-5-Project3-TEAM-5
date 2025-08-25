import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

interface Props {
  value: Date
  onChange: (date?: Date) => void
}

export function PickDate({ value, onChange }: Props) {
  const [open, setOpen] = React.useState(false)

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
            {value ? value.toLocaleDateString() : '날짜 선택'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="start">
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            onSelect={date => {
              onChange(date || undefined)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
