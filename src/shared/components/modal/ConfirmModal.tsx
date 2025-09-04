import { useEffect } from 'react'
import momo from '@/shared/assets/momo/momo-cry-loud.png' // 기본 이미지
import BaseModal from './BaseModal'

interface Props {
  open: boolean
  title: string
  lines: [string, string]
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
  cancelText?: string
  imageSrc?: string
}

function ConfirmModal({
  open,
  title,
  lines,
  onConfirm,
  onCancel,
  confirmText = '확인',
  cancelText = '취소',
  imageSrc
}: Props) {
  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'Enter') {
        e.preventDefault()
        e.stopPropagation()
        onConfirm()
      }
    }
    window.addEventListener('keydown', handleEnter)
    return () => window.removeEventListener('keydown', handleEnter)
  }, [open, onConfirm])

  return (
    <BaseModal
      isOpen={open}
      onClose={onCancel}>
      {/* 제목 */}
      <h2 className="text-center text-[22px] font-bold text-black">{title}</h2>

      {/* 이미지 */}
      <img
        src={imageSrc || momo}
        alt=""
        className="mx-auto mt-3 w-[78px] h-auto object-contain select-none"
      />

      {/* 본문 */}
      <div className="mt-3 text-center text-size-lg leading-6 text-black">
        <p>{lines[0]}</p>
        <p>{lines[1]}</p>
      </div>

      {/* 버튼 영역 */}
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
    </BaseModal>
  )
}

export default ConfirmModal
