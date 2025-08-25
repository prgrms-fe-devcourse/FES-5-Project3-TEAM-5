import inactiveCharacter from '@/shared/assets/vote/inactiveCharacter.png'
import activeCharacter from '@/shared/assets/vote/activeCharacter.png'

function Selection() {
  return (
    <>
      <div>
        <div className="flex items-center gap-x-2 mb-1">
          <img
            className="w-8"
            src={inactiveCharacter}
            alt="선택 아이콘"
          />
          <p className="flex-1">먹는다</p>
          <p>34%</p>
        </div>
        <div className="w-full h-2 bg-neutral-200 rounded-md">
          <div className="w-60 h-2 bg-primary-light rounded-md"></div>
        </div>
      </div>
    </>
  )
}

export default Selection
