import Input from '@/shared/components/form/Input'
import { forwardRef, useImperativeHandle, useRef } from 'react'

interface GroupNameProps {
  disabled?: boolean
}

const GroupName = forwardRef<HTMLInputElement, GroupNameProps>((props, ref) => {
  const { disabled = false } = props
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)
  return (
    <div>
      <label
        className="text-neutral-dark font-semibold mb-1"
        htmlFor="groupName">
        이름
      </label>
      <Input
        ref={inputRef}
        label="가계부 이름"
        id="groupName"
        className={`input-class ${disabled ? 'opacity-50 cursor-not-allowed' : ''} mt-2`}
        maxLength={14}
        disabled={disabled}
      />
    </div>
  )
})

export default GroupName
