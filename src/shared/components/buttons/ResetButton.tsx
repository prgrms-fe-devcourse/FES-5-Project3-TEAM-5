import { tw } from "@/shared/utils/tw";

interface Props {
  text: string
  onClick: () => void;
  className?: string
}


function ResetButton({ text, onClick, className }: Props) {
  return (
    <button
      onClick={onClick}
      type='button'
      className={tw('flex items-center justify-center w-full py-2 rounded-lg text-size-md text-white font-bold transition bg-red-400 hover:bg-secondary-red hover:cursor-pointer', className)}>
      {text}
    </button>
  )
}
export default ResetButton