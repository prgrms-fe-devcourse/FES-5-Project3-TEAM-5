import { useParams } from 'react-router'

export default function StatisticsDetailPage() {
  const { type } = useParams<{ type: 'income' | 'expense' }>()

  return <div>{type}</div>
}
