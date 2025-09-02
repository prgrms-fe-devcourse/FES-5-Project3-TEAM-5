import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import koLocale from '@fullcalendar/core/locales/ko'
import interactionPlugin from '@fullcalendar/interaction'

import { RenderEventContent } from '@/features/calendar/ui/calendar/RenderEventContent'
import { useEffect, useMemo, useRef } from 'react'
import { useSelectedDate } from '@/features/calendar/model/useSelectedDate'

import type { AccountItem } from '@/features/accountItem/index'

interface Props {
  handleDateClick: (date: Date) => void
  calendarEvents: AccountItem[]
}

export const Calendar = ({ handleDateClick, calendarEvents }: Props) => {
  const ref = useRef<FullCalendar>(null)

  const date = useSelectedDate(s => s.date)

  const isSameDate = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()

  useEffect(() => {
    Promise.resolve().then(() => {
      ref.current?.getApi().gotoDate(date)
    })
  }, [date])

  // 캘린더 일자별 수입, 지출 계산
  const fcEvent = useMemo(() => {
    const byDate: Record<string, { income: number; expense: number }> = {}

    for (const e of calendarEvents) {
      const d = e.date
      if (!byDate[d]) byDate[d] = { income: 0, expense: 0 }
      if (e.type === 'income') byDate[d].income += Number(e.amount)
      else byDate[d].expense += Number(e.amount)
    }

    const result = []
    for (const [d, sums] of Object.entries(byDate)) {
      if (sums.income > 0) {
        result.push({
          title: String(sums.income),
          start: d,
          extendedProps: { type: 'income', order: 0 },
          backgroundColor: 'transparent',
          borderColor: 'transparent'
        })
      }
      if (sums.expense > 0) {
        result.push({
          title: String(sums.expense),
          start: d,
          extendedProps: { type: 'expense', order: 1 },
          backgroundColor: 'transparent',
          borderColor: 'transparent'
        })
      }
    }
    return result
  }, [calendarEvents])

  return (
    <FullCalendar
      ref={ref}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      initialDate={date}
      locale={koLocale}
      events={fcEvent}
      height="auto"
      headerToolbar={false}
      eventContent={RenderEventContent}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      eventOrder={(a: any, b: any) =>
        (a.extendedProps?.order ?? 0) - (b.extendedProps?.order ?? 0)
      }
      dateClick={arg => handleDateClick(arg.date)}
      eventClick={arg => handleDateClick(arg.event.start!)}
      dayCellClassNames={arg => {
        const base = [
          'ring-inset',
          'hover:ring-1',
          'hover:ring-primary-base',
          'hover:ring-offset-0',
          'rounded-md',
          'transition'
        ]
        if (date && isSameDate(arg.date, date)) base.push('bg-primary-light')
        return base
      }}
      dayCellContent={arg => ({ html: arg.dayNumberText.replace(/\D/g, '') })}
    />
  )
}
