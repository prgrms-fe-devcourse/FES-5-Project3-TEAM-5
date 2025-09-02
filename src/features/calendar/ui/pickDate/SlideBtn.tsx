interface Props {
  onClick: () => void
  type: 'prev' | 'next'
}

export const SlideBtn = ({ onClick, type }: Props) => {
  return (
    <button
      className="group text-3xl font-bold cursor-pointer"
      onClick={onClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        {type === 'prev' ? (
          <path
            d="M15 6L9 12L15 18"
            className="stroke-[#33363F] group-hover:stroke-primary-light transition-colors"
            strokeWidth="2"
          />
        ) : (
          <path
            d="M9 6L15 12L9 18"
            className="stroke-[#33363F] group-hover:stroke-primary-light transition-colors"
            strokeWidth="2"
          />
        )}
      </svg>
    </button>
  )
}
