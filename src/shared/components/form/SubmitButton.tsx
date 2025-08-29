interface Props {
  text: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

function SubmitButton({ text, type = 'button', onClick }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (type === 'button') {
      e.preventDefault()
    }
    onClick?.()
  }

  return (
    <button
      onClick={handleClick}
      type={type}
      className="flex items-center justify-center w-full py-2 bg-primary-light rounded-lg text-size-md font-bold text-neutral-dark cursor-pointer transition hover:brightness-90 hover:text-black">
      {text}
    </button>
  )
}
export default SubmitButton
