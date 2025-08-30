interface Props {
  children: React.ReactNode
}

export default function Overlay({ children }: Props) {
  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/50"
      role="dialog"
      aria-modal="true">
      <div className="fixed inset-x-0 bottom-0 z-[1001] flex justify-center px-0 pb-[env(safe-area-inset-bottom)]">
        {children}
      </div>
    </div>
  )
}
