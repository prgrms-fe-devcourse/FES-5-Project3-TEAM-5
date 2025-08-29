interface Props {
  onClick: () => void
  disabled: boolean
  type: 'left' | 'right'
}

function ArrowBtn({ onClick, disabled, type }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="이전 이미지"
      className="cursor-pointer">
      {type === 'left' ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 6L9 12L15 18"
            stroke="#1E1E1E"
          />
        </svg>
      ) : (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 6L15 12L9 18"
            stroke="#222222"
          />
        </svg>
      )}
    </button>
  )
}

export default ArrowBtn
