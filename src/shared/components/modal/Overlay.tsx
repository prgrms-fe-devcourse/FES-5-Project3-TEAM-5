import { useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
  onCancel: () => void
}

export default function Overlay({ children, onCancel }: Props) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.style.setProperty(
      'overflow',
      'hidden',
      'important'
    )
    modalRef.current?.focus()
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.documentElement.style.setProperty(
        'overflow',
        'auto',
        'important'
      )
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onCancel])

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/50"
      role="dialog"
      aria-modal="true"
      onClick={onCancel}>
      <div className="fixed inset-x-0 bottom-0 z-[1001] flex justify-center px-0 pb-[env(safe-area-inset-bottom)] ">
        <div
          className=" w-full max-w-[420px] rounded-t-xl bg-white p-5"
          onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  )
}
