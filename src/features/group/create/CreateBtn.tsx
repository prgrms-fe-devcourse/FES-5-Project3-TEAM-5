import SubmitButton from '@/shared/components/form/SubmitButton'
import { useEffect } from 'react'

function CreateBtn({ onClick }: { onClick: () => void }) {
  useEffect(() => {})

  return (
    <div>
      <SubmitButton
        text="생성 완료"
        type="submit"
        onClick={onClick}
      />
    </div>
  )
}

export default CreateBtn
