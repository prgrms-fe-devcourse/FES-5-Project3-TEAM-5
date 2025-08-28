

type Props = {
  label: string
  value: string | null;
  placeholder: string;
  onClick: () => void
}


function SelectField({ label, value, placeholder, onClick }: Props) {
  return (
    <div className="flex items-center gap-5 h-7 w-full">
      <span className="text-base text-neutral-dark font-bold">{label}</span>
      <div className="relative flex-1">
        <input
          type="text"
          readOnly
          value={value || ''}
          placeholder={placeholder}
          onClick={onClick}
          className="px-2.5 w-full bg-transparent text-black focus:outline-none focus:border-primary-light border-b-2 border-neutral-light placeholder:text-neutral-dark"
        />
      </div>
    </div>
  )
}
export default SelectField