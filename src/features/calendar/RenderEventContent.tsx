import { tw } from '../../shared/utils/tw'
import { formatPriceNumber } from '../../shared/utils/format'
import type { EventContentArg } from '@fullcalendar/core'
import React from 'react'

export const RenderEventContent = (eventInfo: EventContentArg) => {
  const type = (
    eventInfo.event.extendedProps as { type?: 'income' | 'expense' }
  ).type

  return (
    <div
      className={tw(
        'text-center ',
        Number(eventInfo.event.title.length) > 4 && '!text-size-xxs',
        Number(eventInfo.event.title.length) <= 4 && '!text-size-xs',
        type === 'income' ? 'text-secondary-blue' : 'text-secondary-red'
      )}>
      {type === 'income' ? '+' : '-'}
      {formatPriceNumber(Number(eventInfo.event.title))}
    </div>
  )
}

React.memo(RenderEventContent)
