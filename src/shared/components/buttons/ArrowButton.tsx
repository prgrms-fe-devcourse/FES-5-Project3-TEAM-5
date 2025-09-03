interface Props {
  onClick: () => void
  disabled?: boolean
  type: 'left' | 'right'
  text: string
  textPosition?: 'left' | 'right'
  ariaLabel?: string
}

function ArrowButton({ onClick, disabled, type, text, ariaLabel, textPosition = 'left' }: Props) {

  const Icon = type === 'left'
    ? (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15 6L9 12L15 18" stroke="#1E1E1E" />
      </svg>
    )
    : (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9 6L15 12L9 18" stroke="#222222" />
      </svg>
    )

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel ?? text}
      className="flex items-center gap-1 cursor-pointer"
    >
      {textPosition === 'left' ? (
        <>
          <span>{text}</span>
          {Icon}
        </>
      ) : (
        <>
          {Icon}
          <span>{text}</span>
        </>
      )}
    </button>
  )
}
export default ArrowButton