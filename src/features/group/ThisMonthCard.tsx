import { tw } from '@/shared/utils/tw'

interface Props {
  type: '수입' | '지출'
  className?: string
}

function ThisMonthCard({ type, className }: Props) {
  return (
    <div className="bg-white flex flex-col justify-center items-center px-6 py-3 rounded-lg">
      <h3 className="text-md font-light">이번 달 {type}</h3>
      <p className={tw(' text-lg', className)}>
        {type === '수입' ? '+' : '-'}2,450,000원
      </p>
    </div>
  )
}

export default ThisMonthCard
