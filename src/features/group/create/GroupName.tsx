import Input from '@/shared/components/form/Input'
import { useSnackbarStore } from '@/shared/stores/useSnackbarStore'

function GroupName({
  value,
  onChange
}: {
  value: string
  onChange: (v: string) => void
}) {
  const showSnackbar = useSnackbarStore(state => state.showSnackbar)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const groupName = e.target.value
    onChange(groupName)

    if (groupName.length > 15) {
      showSnackbar({ text: '15자 이상은 안돼요', type: 'error' })
      return
    }
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
        className="mt-2"
        value={value}
        maxLength={15}
      />
    </div>
  )
}

export default GroupName
