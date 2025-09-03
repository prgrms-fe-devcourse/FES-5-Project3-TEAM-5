import Input from '@/shared/components/form/Input'
import { useSnackbarStore } from '@/shared/stores/useSnackbarStore'

function GroupName({
  value,
  onChange,
  disabled = false
}: {
  value: string
  onChange: (v: string) => void
  disabled?: boolean
}) {
  const showSnackbar = useSnackbarStore(state => state.showSnackbar)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const groupName = e.target.value
    onChange(groupName)
  }

  return (
    <div>
      <label
        className="text-neutral-dark font-semibold mb-1"
        htmlFor="groupName">
        이름
      </label>
      <Input
        label="가계부 이름"
        id="groupName"
        onChange={e => handleChange(e)}
        className={`input-class ${disabled ? 'opacity-50 cursor-not-allowed' : ''} mt-2`}
        value={value}
        maxLength={14}
        disabled={disabled}
      />
    </div>
  )
}

export default GroupName
