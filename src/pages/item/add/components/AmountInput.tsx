import { formatPriceInput, formatPriceNumber } from '@/shared/utils/format'
import { tw } from '@/shared/utils/tw'
import { useState } from 'react'

type Props = {
  value: string
  onChange: (next: string) => void
  maxDigits?: number
  placeholder?: string
  label?: string
  name?: string
}

function AmountInput({
  value,
  onChange,
  maxDigits,
  placeholder = '금액을 입력해 주세요',
  label = '금액',
  name = 'amount'
}: Props) {
  const [focused, setFocused] = useState(false) // 포커스 여부에 따라 숫자 포맷을 다르게 보여줌
  const displayText =
    value && !focused ? `${formatPriceNumber(Number(value))} 원` : '' // 포커스 시 표시용 숫자

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = formatPriceInput(e.target.value, maxDigits)
    onChange(next)
  }

  return (
    <div className="flex items-center gap-5 h-7 w-full">
      <span className="text-base text-neutral-dark font-bold">{label}</span>

      <div className="relative flex-1">
        <input
          type="text"
          inputMode="numeric"
          aria-label={label}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={tw(
            'px-2.5 w-full bg-transparent z-10 relative text-black border-b-2 border-primary-light focus:outline-none placeholder:text-neutral-dark',
            focused ? 'opacity-100' : 'opacity-0'
          )}
        />

        <div
          aria-hidden
          className="px-2.5 absolute inset-0 flex items-center pointer-events-none border-b-2 border-neutral-light">
          {displayText ? (
            <span className="text-black">{displayText}</span>
          ) : (
            <span className="text-neutral-dark">{!focused && placeholder}</span>
          )}
        </div>
      </div>
    </div>
  )
}
export default AmountInput
