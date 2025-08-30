import { useState, useRef, useEffect } from 'react'
import { tw } from '@/shared/utils/tw'
import { motion, AnimatePresence } from 'framer-motion'

interface DropdownProps {
  options: { label: string; value: number }[]
  value: number
  onChange: (v: number) => void
}

function Dropdown({ options, value, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])

  // 외부 클릭 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setHighlightIndex(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // highlight된 요소가 보이도록 스크롤
  useEffect(() => {
    if (highlightIndex !== null && optionRefs.current[highlightIndex]) {
      optionRefs.current[highlightIndex]?.scrollIntoView({
        block: 'nearest',
        inline: 'nearest'
      })
    }
  }, [highlightIndex])

  const selectedLabel =
    options.find(o => o.value === value)?.label ?? options[0].label

  // 키보드 이벤트
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement | HTMLUListElement>
  ) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        setOpen(true)
        const idx = options.findIndex(o => o.value === value)
        setHighlightIndex(idx >= 0 ? idx : 0)
      }
      return
    }

    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
      setHighlightIndex(null)
      buttonRef.current?.focus()
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIndex(prev =>
        prev === null ? 0 : Math.min(prev + 1, options.length - 1)
      )
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIndex(prev =>
        prev === null ? options.length - 1 : Math.max(prev - 1, 0)
      )
    }

    if (e.key === 'Enter' && highlightIndex !== null) {
      e.preventDefault()
      onChange(options[highlightIndex].value)
      setOpen(false)
      setHighlightIndex(null)
      buttonRef.current?.focus()
    }
  }

  return (
    <div
      ref={ref}
      className="relative">
      {/* 버튼 */}
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          setOpen(!open)
          if (!open) {
            // 열릴 때 현재 선택된 값에 하이라이트
            const idx = options.findIndex(o => o.value === value)
            setHighlightIndex(idx >= 0 ? idx : 0)
          }
        }}
        onKeyDown={handleKeyDown}
        className="flex items-center justify-between min-w-[80px] px-3 py-1.5 rounded-md bg-white text-black font-bold text-size-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-light">
        {selectedLabel}
        <span className="ml-1 text-black">▾</span>
      </button>

      {/* 드롭다운 목록 */}
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute z-10 mt-1 max-h-48 overflow-y-auto w-full bg-white border rounded-md shadow-lg">
            {options.map((opt, i) => (
              <li key={opt.value}>
                <button
                  ref={el => {
                    optionRefs.current[i] = el
                  }}
                  role="option"
                  aria-selected={highlightIndex === i}
                  type="button"
                  onClick={() => {
                    onChange(opt.value)
                    setOpen(false)
                    setHighlightIndex(null)
                    buttonRef.current?.focus()
                  }}
                  className={tw(
                    'block w-full text-left px-3 py-1.5 hover:bg-primary-base hover:text-white focus:bg-primary-base focus:text-white',
                    highlightIndex === i && 'bg-primary-base text-white'
                  )}>
                  {opt.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Dropdown
