import SubmitButton from '@/shared/components/form/SubmitButton'

function CreateBtn() {
  const handleCreateGroup = () => {}

  return (
    <div>
      <SubmitButton
        text="생성 완료"
        type="submit"
        onClick={() => handleCreateGroup()}
      />
    </div>
  )
}

export default CreateBtn
