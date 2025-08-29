interface Props {
  header: string
  btn1: string
  btn2: string
  defaultValue?: string // 초기값
  name: string
  value: boolean | null
  onChange: (value: boolean) => void
  className?: string
}

function Toggle({
  header,
  btn1,
  btn2,
  name,
  value,
  onChange,
  className
}: Props) {
  return (
    <div className={className}>
      <label
        className="text-neutral-dark font-semibold"
        htmlFor={name}>
        {header}
      </label>
      <div className="flex gap-2 mt-2">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`bg-gray-200 rounded-md w-25 h-7 text-md cursor-pointer hover:bg-primary-pale ${value === true ? 'bg-primary-light' : ''}`}>
          {btn1}
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`bg-gray-200 rounded-md w-25 h-7 text-md cursor-pointer hover:bg-primary-pale ${value === false ? 'bg-primary-light' : ''}`}>
          {btn2}
        </button>
      </div>

      <input
        type="hidden"
        name={name}
        id={name}
        value={value ? btn1 : btn2}
      />
    </div>
  )
}

export default Toggle
