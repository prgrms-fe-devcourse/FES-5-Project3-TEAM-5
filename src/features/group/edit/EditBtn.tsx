import SubmitButton from '@/shared/components/form/SubmitButton'

function EditBtn({ onClick }: { onClick: () => void }) {
  return (
    <div>
      <SubmitButton
        text="수정 완료"
        type="submit"
        onClick={onClick}
      />
    </div>
  )
}

export default EditBtn
