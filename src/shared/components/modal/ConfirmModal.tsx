import { useEffect, useRef } from 'react'
import ModalPortal from './ModalPortal'
import momo from '@/shared/assets/momo/momo-cry-loud.png'

interface Props {
  title: string
  lines: [string, string]
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
  cancelText?: string
}

function ConfirmModal({
  title,
  lines,
  onConfirm,
  onCancel,
  confirmText = '확인',
  cancelText = '취소'
}: Props) {
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
      else if (e.key === 'Enter') onConfirm()
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
  }, [onCancel, onConfirm])

  return (
    <ModalPortal>
      {/* 딤드 */}
      <div
        className="fixed inset-0 z-[1000] bg-black/50"
        onClick={onCancel}
      />

      {/* 하단 컨테이너 */}
      <div
        className="fixed inset-x-0 bottom-0 z-[1001] flex justify-center px-0 pb-[env(safe-area-inset-bottom)]"
        onClick={onCancel}>
        {/* 모달 */}
        <div
          ref={modalRef}
          tabIndex={-1}
          onClick={e => e.stopPropagation()}
          className="w-full max-w-[420px] rounded-t-xl bg-white p-5">
          {/* 제목 + X 버튼 */}
          <div className="relative">
            <h2 className="text-center text-[22px] font-bold text-black">
              {title}
            </h2>
            <button
              type="button"
              onClick={onCancel}
              aria-label="닫기"
              className="absolute right-0 top-0 w-5 h-5 rounded-full ring-[3px] ring-[currentColor] inline-flex items-center justify-center leading-none text-neutral-DEFAULT hover:text-neutral-dark hover:cursor-pointer">
              <svg
                viewBox="0 0 7 7"
                className="block fill-current w-3 h-3"
                aria-hidden="true">
                <path d="M6.03764 0.962154C5.95061 0.875081 5.84728 0.806008 5.73354 0.758882C5.61981 0.711756 5.49791 0.6875 5.3748 0.6875C5.25169 0.6875 5.12978 0.711756 5.01605 0.758882C4.90232 0.806008 4.79898 0.875081 4.71195 0.962154L3.4998 2.17431L2.28764 0.962154C2.11168 0.787165 1.8735 0.689092 1.62534 0.689437C1.37717 0.689782 1.13927 0.788518 0.963796 0.963996C0.788317 1.13947 0.689582 1.37737 0.689236 1.62554C0.688891 1.8737 0.786964 2.11188 0.961954 2.28784L2.17411 3.5L0.961954 4.71215C0.87451 4.79911 0.805084 4.90247 0.757653 5.01631C0.710222 5.13014 0.685719 5.25222 0.685548 5.37554C0.685376 5.49886 0.709539 5.621 0.756653 5.73497C0.803767 5.84894 0.872905 5.95249 0.960107 6.03969C1.04731 6.12689 1.15086 6.19603 1.26483 6.24314C1.37879 6.29026 1.50094 6.31442 1.62426 6.31425C1.74758 6.31408 1.86965 6.28957 1.98349 6.24214C2.09732 6.19471 2.20068 6.12529 2.28764 6.03784L3.4998 4.82569L4.71195 6.03784C4.88792 6.21283 5.12609 6.3109 5.37426 6.31056C5.62242 6.31021 5.86032 6.21148 6.0358 6.036C6.21128 5.86052 6.31001 5.62262 6.31036 5.37446C6.3107 5.12629 6.21263 4.88812 6.03764 4.71215L4.82549 3.5L6.03764 2.28784C6.12471 2.20081 6.19379 2.09748 6.24091 1.98374C6.28804 1.87001 6.3123 1.74811 6.3123 1.625C6.3123 1.50189 6.28804 1.37998 6.24091 1.26625C6.19379 1.15252 6.12471 1.04918 6.03764 0.962154Z" />
              </svg>
            </button>
          </div>

          {/* 이미지 */}
          <img
            src={momo}
            alt=""
            className="mx-auto mt-3 w-[78px] h-auto object-contain select-none"
          />

          {/* 본문 */}
          <div className="mt-3 text-center text-size-lg leading-6 text-black">
            <p>{lines[0]}</p>
            <p>{lines[1]}</p>
          </div>

          {/* 버튼 */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="h-11 rounded-lg bg-zinc-100 text-zinc-600 font-bold hover:bg-zinc-200 hover:cursor-pointer">
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="h-11 rounded-lg bg-[#F36F61] text-white font-bold hover:brightness-95 hover:cursor-pointer">
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  )
}

export default ConfirmModal
