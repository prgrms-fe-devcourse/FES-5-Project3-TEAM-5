import inactiveCharacter from '@/shared/assets/vote/inactiveCharacter.png'
import activeCharacter from '@/shared/assets/vote/activeCharacter.png'
import { motion } from 'framer-motion'

interface Props {
  selectionText: string
  percent?: number
  status: 'selected' | 'unselected'
}

export function ResultOption({
  percent = 0,
  selectionText,
  status = 'unselected'
}: Props) {
  const className = () => {
    switch (status) {
      case 'selected':
        return 'bg-primary-pale p-2 rounded-md'
      case 'unselected':
        return 'p-2'
      default:
        break
    }
  }
  return (
    <>
      <div className={className()}>
        <div className="flex items-center gap-x-2 mb-1">
          <img
            className="w-8"
            src={status === 'selected' ? activeCharacter : inactiveCharacter}
            alt="선택 아이콘"
          />
          <p className="flex-1">{selectionText}</p>
          <p>{percent}%</p>
        </div>
        <div className="w-full h-2 bg-neutral-200 rounded-md">
          <motion.div
            className="h-2 bg-primary-light rounded-md"
            initial={{ width: '0%' }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        </div>
      </div>
    </>
  )
}
