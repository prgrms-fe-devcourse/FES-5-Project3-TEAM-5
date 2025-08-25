interface Props {
  text: string
  className?: string
}

// disabled , active, hover

function ButtonLayout({ text }: Props) {
  return (
    <button
      type="button"
      className="px-4 py-2 rounded-2xl text-neutral-dark text-size-md bg-neutral-light hover:brightness-90 hover:text-black cursor-pointer">
      {text}
    </button>
  )
}
export default ButtonLayout
