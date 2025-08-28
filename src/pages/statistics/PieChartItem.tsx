import type { AccountItem } from '@/features/accountItem'
import { Pie, PieChart, Tooltip } from 'recharts'
import { expenseColors, incomeColors } from './constant'

interface Props {
  type: 'income' | 'expense'
  data: AccountItem[]
  onClick?: () => void
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
    <PieChart
      width={300}
      height={300}
      onClick={onClick}>
      <Pie
        data={pieData}
        dataKey="uv"
        stroke="none"
        innerRadius={80}
        outerRadius={130}
      />
      <Tooltip />
    </PieChart>
  )
}
