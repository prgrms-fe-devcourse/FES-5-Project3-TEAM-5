import { forwardRef } from 'react'

interface Props {
  label: string
}

const Input = forwardRef<HTMLInputElement, Props>(({ label }, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      className="bg-white rounded-lg border-2 border-neutral-light w-full py-2 px-1 text-black focus:border-primary-light focus:outline focus:outline-primary-light"
      placeholder={`${label}를 입력해 주세요`}
    />
  )
})

export default Input
