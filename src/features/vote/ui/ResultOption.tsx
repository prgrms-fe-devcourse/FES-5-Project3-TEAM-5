import inactiveCharacter from '@/shared/assets/vote/inactiveCharacter.png'
import activeCharacter from '@/shared/assets/vote/activeCharacter.png'
import { motion } from 'framer-motion'

interface Props {
  selectionText: string
  totalParticipants: number
  optionId: string
  voteId: string
  isSelected: boolean
  isDisabled: boolean
  isParticipant: boolean
  optionParticipants: number
  onSelect: (vote_id: string, option_id: string) => void
}

export function ResultOption({
  selectionText,
  totalParticipants,
  voteId,
  optionId,
  isSelected,
  isDisabled,
  isParticipant,
  optionParticipants,
  onSelect
}: Props) {
  const handleSelect = (voteId: string, optionId: string) => {
    if (!isDisabled) {
      onSelect(voteId, optionId)
    } else {
      alert('투표 기간이 종료되어 현재는 참여가 불가능합니다.')
    }
  }
  const percentage =
    totalParticipants === 0
      ? 0
      : Math.round((optionParticipants / totalParticipants) * 100)
  return (
    <>
      <div
        className={
          isSelected && !isDisabled ? 'bg-primary-pale p-2 rounded-md' : 'p-2'
        }>
        <div className="flex items-center gap-x-2 mb-1">
          <img
            onClick={() => handleSelect(voteId, optionId)}
            className="w-8"
            src={
              isSelected && !isDisabled ? activeCharacter : inactiveCharacter
            }
            alt="선택 아이콘"
          />
          <p className="flex-1">{selectionText}</p>
          <p>{isParticipant || isDisabled ? percentage : '??'}%</p>
        </div>
        <div className="w-full h-2 bg-neutral-200 rounded-md">
          <motion.div
            className={
              (isSelected || !isParticipant) && !isDisabled
                ? 'h-2 bg-primary-light rounded-md'
                : 'h-2 bg-neutral-dark rounded-md'
            }
            initial={{ width: '0%' }}
            animate={{
              width: `${isParticipant || isDisabled ? percentage : 100}%`
            }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        </div>
      </div>
    </>
  )
}
