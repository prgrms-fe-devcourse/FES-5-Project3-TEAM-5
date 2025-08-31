import SubmitButton from '@/shared/components/form/SubmitButton'

function CreateBtn({ onClick }: { onClick: () => void }) {
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
