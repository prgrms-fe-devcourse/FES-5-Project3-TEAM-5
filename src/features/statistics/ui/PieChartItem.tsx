import type { AccountItem } from '@/features/accountItem'
import {
  Pie,
  PieChart,
  Tooltip,
  ResponsiveContainer,
  type PieLabel
} from 'recharts'
import { expenseColors, incomeColors } from '../model/constant'
import { formatPriceNumber } from '@/shared/utils/format'

interface Props {
  type: 'income' | 'expense'
  data: AccountItem[]
  onClick?: () => void
}

const labelText = (props: { name: string; percent: number }) => {
  const { name, percent } = props
  const p = Math.round(((percent ?? 0) as number) * 100)
  return `${name} ${isFinite(p) ? p : 0}%`
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const renderSmallLabel: PieLabel = (props: any) => {
  const { x, y, textAnchor, name, percent } = props
  const p = Math.round(((percent ?? 0) as number) * 100)

  return (
    <text
      x={x}
      y={y}
      textAnchor={textAnchor}
      dominantBaseline="central"
      fill="#111827"
      fontSize={12}>
      <tspan
        x={x}
        dy={-6}>
        {String(name ?? '')}
      </tspan>
      <tspan
        x={x}
        dy={12}
        fontWeight={700}>
        {p}%
      </tspan>
    </text>
  )
}

export const PieChartItem = ({ type, data, onClick }: Props) => {
  let pieData: { name: string; uv: number; fill: string }[] = []

  if (type === 'income') {
    pieData = data.map(item => ({
      name: item.categories?.korean_name ?? '기타',
      uv: Number(item.amount),
      fill:
        incomeColors.find(c => c.title === item.categories?.name)?.color ??
        '#cccccc'
    }))
  }
  if (type === 'expense') {
    pieData = data.map(item => ({
      name: item.categories?.korean_name ?? '기타',
      uv: Number(item.amount),
      fill:
        expenseColors.find(c => c.title === item.categories?.name)?.color ??
        '#cccccc'
    }))
  }

  return (
    <ResponsiveContainer
      width="100%"
      height={320}>
      <PieChart onClick={onClick}>
        <Pie
          data={pieData}
          dataKey="uv"
          stroke="none"
          innerRadius={70}
          outerRadius={120}
          paddingAngle={3}
          labelLine
          label={renderSmallLabel as PieLabel}
        />
        <Tooltip
          formatter={(value: number, name: string) => [
            formatPriceNumber(Number(value)),
            name
          ]}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
