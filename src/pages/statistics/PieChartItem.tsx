import type { AccountItem } from '@/features/accountItem'
import { Pie, PieChart, Tooltip } from 'recharts'

const incomeColors = [
  { name: '월급', title: 'salary', color: '#8ecae6' },
  { name: '부수입', title: 'additional', color: '#219ebc' },
  { name: '용돈', title: 'allowance', color: '#ffb703' },
  { name: '상여', title: 'bonus', color: '#fb8500' },
  { name: '금융소득', title: 'financial', color: '#023047' },
  { name: '기타', title: 'etc', color: '#ffddd2' }
]

const expenseColors = [
  { name: '미용', title: 'beauty', color: '#e63946' },
  { name: '카페', title: 'cafe', color: '#f1faee' },
  { name: '의류', title: 'clothes', color: '#a8dadc' },
  { name: '문화생활', title: 'cultural', color: '#457b9d' },
  { name: '생필품', title: 'dailyNecessities', color: '#1d3557' },
  { name: '주거', title: 'dwelling', color: '#f4a261' },
  { name: '교육', title: 'education', color: '#2a9d8f' },
  { name: '기타', title: 'etc', color: '#e9c46a' },
  { name: '경조사', title: 'events', color: '#d62828' },
  { name: '식비', title: 'food', color: '#f77f00' },
  { name: '보험', title: 'insurance', color: '#264653' },
  { name: '의료/건강', title: 'medical', color: '#a2d2ff' },
  { name: '통신비', title: 'phone', color: '#ffcad4' },
  { name: '저축', title: 'savings', color: '#6a4c93' },
  { name: '교통비', title: 'transport', color: '#ff7b00' }
]

interface Props {
  type: 'income' | 'expense'
  data: AccountItem[]
}

export const PieChartItem = ({ type, data }: Props) => {
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
      width={400}
      height={400}>
      <Pie
        data={pieData}
        dataKey="uv"
        stroke="none"
      />
      <Tooltip defaultIndex={2} />
    </PieChart>
  )
}
