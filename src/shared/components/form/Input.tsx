import { tw } from '@/shared/utils/tw'
import { forwardRef } from 'react'

interface Props {
  label: string
  className?: string
  id?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  maxLength?: number
  disabled?: boolean
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    { label, className, id, onChange, value, maxLength, disabled = false },
    ref
  ) => {
    return (
      <input
        ref={ref}
        id={id}
        name={id}
        type="text"
        onChange={onChange}
        disabled={disabled}
        value={value}
        maxLength={maxLength}
        className={tw(
          'bg-white rounded-lg border-2 border-neutral-light w-full py-2 px-1 text-black focus:border-primary-light focus:outline focus:outline-primary-light',
          className
        )}
        placeholder={`${label}를 입력해 주세요`}
      />
    )
  }
)

export default Input
