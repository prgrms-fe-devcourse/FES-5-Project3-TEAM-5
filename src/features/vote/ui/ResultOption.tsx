import inactiveCharacter from '@/shared/assets/vote/inactiveCharacter.png'
import activeCharacter from '@/shared/assets/vote/activeCharacter.png'
import { motion } from 'framer-motion'
import type { VoteOptions } from '../model/type'

interface Props {
  selectionText: string
  participants: number
  voteOptions: VoteOptions[]
  status?: 'selected' | 'unselected'
}

export function ResultOption({
  selectionText,
  status = 'unselected',
  voteOptions,
  participants
}: Props) {
  const getClass = () => {
    switch (status) {
      case 'selected':
        return 'bg-primary-pale p-2 rounded-md'
      case 'unselected':
        return 'p-2'
      default:
        break
    }
  }
  // eslint-disable-next-line no-console
  console.log(voteOptions)

  return (
    <>
      <div className={getClass()}>
        <div className="flex items-center gap-x-2 mb-1">
          <img
            className="w-8"
            src={status === 'selected' ? activeCharacter : inactiveCharacter}
            alt="선택 아이콘"
          />
          <p className="flex-1">{selectionText}</p>
          <p>{participants}%</p>
        </div>
        <div className="w-full h-2 bg-neutral-200 rounded-md">
          <motion.div
            className="h-2 bg-primary-light rounded-md"
            initial={{ width: '0%' }}
            animate={{ width: `${participants}%` }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        </div>
      </div>
    </>
  )
}
