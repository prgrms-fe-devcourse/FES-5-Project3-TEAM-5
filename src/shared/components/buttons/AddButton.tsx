type Props = {
  size?: 'sm' | 'lg'
  onClick?: () => void
  ariaLabel?: string
  className?: string
}

function AddButton({
  size = 'lg',
  onClick,
  ariaLabel = '추가',
  className
}: Props) {
  const circleSize = size === 'sm' ? 'w-[26px] h-[26px]' : 'w-10 h-10'
  const plusSize = 'w-[45%] h-[45%]'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${circleSize} rounded-full flex items-center justify-center cursor-pointer
      bg-[#F6C9A4] hover:bg-[#ED944A] text-[#ED944A] hover:text-white
        transition-colors ${className ?? ''}`}>
      <svg
        className={plusSize}
        viewBox="0 0 14 14"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.25 2C8.25 1.30965 7.69033 0.75 7 0.75C6.30967 0.75 5.75 1.30965 5.75 2V5.75H2C1.30965 5.75 0.75 6.30967 0.75 7C0.75 7.69033 1.30965 8.25 2 8.25H5.75V12C5.75 12.6903 6.30967 13.25 7 13.25C7.69033 13.25 8.25 12.6903 8.25 12V8.25H12C12.6903 8.25 13.25 7.69033 13.25 7C13.25 6.30967 12.6903 5.75 12 5.75H8.25V2Z"
          fill="currentColor"
        />
      </svg>
    </button>
  )
}
export default AddButton
