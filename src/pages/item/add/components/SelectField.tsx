

type Props = {
  label: string
  value: string | null;
  placeholder: string;
  onClick: () => void
  onButtonClick?: () => void
  hideButton?: boolean
}


function SelectField({ label, value, placeholder, onClick, onButtonClick, hideButton = true }: Props) {
  return (
    <div className="flex items-center gap-5 h-7 w-full">
      <span className="text-base text-neutral-dark font-bold">{label}</span>
      <div className="relative flex-1">
        <div className="flex items-center h-full border-b-2 border-neutral-light focus-within:border-primary-light">
          <input
            type="text"
            readOnly
            value={value || ''}
            placeholder={placeholder}
            onClick={onClick}
            className="w-full truncate px-2.5 bg-transparent text-black focus:outline-none placeholder:text-neutral-dark"
          />
          {!hideButton && onButtonClick && (
            <button
              type="button"
              onClick={onButtonClick}
              className="flex whitespace-nowrap items-center gap-1 text-secondary-red hover:cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              삭제
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
export default SelectField