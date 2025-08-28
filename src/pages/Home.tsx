import Input from '@/shared/components/form/Input'
import AddButton from '@/shared/components/buttons/AddButton'
import { useRef } from 'react'

export const Home = () => {
  const nameRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <div>Hello ttomo</div>
      <AddButton size="sm" />
      <AddButton size="lg" />

      <Input
        label="이름"
        ref={nameRef}
      />
    </>
  )
}
