import inactiveCharacter from '@/shared/assets/vote/inactiveCharacter.png'
import activeCharacter from '@/shared/assets/vote/activeCharacter.png'
import { motion } from 'framer-motion'

interface Props {
  selectionText: string
  participants: number
  optionId: string
  voteId: string
  isSelected: boolean
  onSelect: (vote_id: string, option_id: string) => void
}

export function ResultOption({
  selectionText,
  participants,
  voteId,
  optionId,
  isSelected,
  onSelect
}: Props) {
  const handleSelect = (voteId: string, optionId: string) => {
    onSelect(voteId, optionId)
  }

  return (
    <>
      <div className={isSelected ? 'bg-primary-pale p-2 rounded-md' : 'p-2'}>
        <div className="flex items-center gap-x-2 mb-1">
          <img
            onClick={() => handleSelect(voteId, optionId)}
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
