import loading from '@/shared/assets/loading.gif'
import { tw } from '@/shared/utils/tw'

function Loading({ text, className }: { text?: string; className?: string }) {
  return (
    <div
      className={tw(
        `"flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`,
        className
      )}>
      {text && <h1 className="text-lg font-semibold">{text}</h1>}
      <img
        src={loading}
        alt="loading gif"
        className="w-50"
      />
    </div>
  )
}

export default Loading
