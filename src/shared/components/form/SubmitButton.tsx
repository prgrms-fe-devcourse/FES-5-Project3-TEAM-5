import { tw } from "@/shared/utils/tw";

interface Props {
  text: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  disabled?: boolean;
  className?: string
}

function SubmitButton({ text, type = 'button', onClick, disabled, className }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onClick?.()
  }

  return (
    <button
      onClick={handleClick}
      type={type}
      disabled={disabled}
      className={tw('flex items-center justify-center w-full py-2 rounded-lg text-size-md text-neutral-dark font-bold transition', disabled ? 'bg-neutral-light  cursor-not-allowed' : 'bg-primary-light hover:bg-[#f7c954] hover:text-black cursor-pointer', className)}>
      {text}
    </button>
  )
}
export default SubmitButton
