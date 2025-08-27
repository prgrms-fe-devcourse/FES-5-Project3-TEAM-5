import loading from '@/shared/assets/loading.gif'

function Loading({ text }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
