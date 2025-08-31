const RepeatIcon = () => (
  <svg
    viewBox="0 0 20 20"
    width="12"
    height="12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8">
    <path d="M4 7a6 6 0 0 1 10-1" />
    <path d="M14 4v3h-3" />
    <path d="M16 13a6 6 0 0 1-10 1" />
    <path d="M6 16v-3h3" />
  </svg>
)

const InstallmentIcon = () => (
  <svg
    viewBox="0 0 20 20"
    width="12"
    height="12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8">
    <rect
      x="2.5"
      y="4.5"
      width="15"
      height="11"
      rx="2"
    />
    <path d="M2.5 8h15" />
  </svg>
)

export const Badge = ({
  variant,
  children
}: {
  variant: 'repeat' | 'installment'
  children: React.ReactNode
}) => {
  const styles =
    variant === 'repeat'
      ? 'bg-blue-50 text-blue-600 border-blue-200'
      : 'bg-violet-50 text-violet-600 border-violet-200'

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] ${styles}`}>
      {variant === 'repeat' ? <RepeatIcon /> : <InstallmentIcon />}
      {children}
    </span>
  )
}
