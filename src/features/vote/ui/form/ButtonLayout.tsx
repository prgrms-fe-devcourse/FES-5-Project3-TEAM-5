import { tw } from '@/shared/utils/tw'

interface Props {
  text: string
  status?: string
  id: string
  onStatusChange: (clickedId: string) => void
}

function ButtonLayout({
  id,
  text,
  status = 'inactive',
  onStatusChange
}: Props) {
  const className = () => {
    switch (status) {
      case 'active':
        return 'bg-primary-light font-bold text-black'
      case 'inactive':
        return 'bg-neutral-light text-neutral-dark'
      case 'disabled':
        return 'bg-neutral-DEFAULT text-black'
      default:
        return 'bg-neutral-light text-neutral-dark'
    }
  }
  return (
    <button
      type="button"
      onClick={() => onStatusChange(id)}
      className={tw(
        'px-4 py-2 rounded-2xl text-size-md hover:brightness-90 cursor-pointer ',
        className()
      )}>
      {text}
    </button>
  )
}
export default ButtonLayout
