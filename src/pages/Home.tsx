import Input from '@/shared/components/form/Input'
import SubmitButton from '@/shared/components/form/SubmitButton'
import AddButton from '@/shared/components/buttons/AddButton'
import { useRef } from 'react'
import Snackbar from '@/shared/components/snackbar/Snackbar'

export const Home = () => {
  const nameRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    console.log('입력값:', nameRef.current?.value)
  }
  return (
    <>
      <div>Hello ttomo</div>
      <AddButton size="sm" />
      <AddButton size="lg" />

      <Input
        label="이름"
        ref={nameRef}
      />
      <SubmitButton
        text="수정 완료"
        onClick={handleSubmit}
      />
    </>
  )
}
