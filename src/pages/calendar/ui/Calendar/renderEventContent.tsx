import { cn } from '../../../../shared/utils/cn'
import { formatPriceNumber } from '../../../../shared/utils/format'
import type { EventContentArg } from '@fullcalendar/core'

export const RenderEventContent = (eventInfo: EventContentArg) => {
  const type = (
    eventInfo.event.extendedProps as { type?: 'income' | 'expense' }
  ).type

  return (
    <div
      className={cn(
        '!text-size-xs text-center',
        type === 'income' ? 'text-secondary-blue' : 'text-secondary-red'
      )}>
      {type === 'income' ? '+' : '-'}
      {formatPriceNumber(Number(eventInfo.event.title))}
    </div>
  )
}
