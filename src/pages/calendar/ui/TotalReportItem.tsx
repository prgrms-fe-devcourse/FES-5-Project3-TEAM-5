import React from 'react'
import { cn } from '../../../shared/utils/cn'

interface Props {
  title: string
  amount: number
}

export const TotalReportItem = ({ title, amount }: Props) => {
  return (
    <div className="flex flex-col text-size-md items-center justify-center">
      <p className="">{title}</p>
      <p
        className={cn(
          'font-bold',
          title === '수입' && 'text-secondary-blue',
          title === '지출' && 'text-secondary-red',
          title === '잔액' && 'text-black'
        )}>
        {title === '수입' ? '+' : title === '지출' ? '-' : ''}
        {amount}원
      </p>
    </div>
  )
}

React.memo(TotalReportItem)
