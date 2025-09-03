import { tw } from '@/shared/utils/tw'
import { motion } from 'framer-motion'
import spinner from '@/shared/assets/spinner.png'

function Loading({
  text,
  className,
  imgClassName
}: {
  text?: string
  className?: string
  imgClassName?: string
}) {
  return (
    <div
      className={tw(
        'flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        className
      )}>
      {text && <h1 className="text-lg font-semibold mb-4">{text}</h1>}
      <motion.img
        src={spinner}
        alt="loading spinner"
        className={tw('w-8', imgClassName)}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: 'linear'
        }}
        initial={{ opacity: 0.7 }}
        animate={{
          rotate: 360,
          opacity: 1,
          scale: 1
        }}
      />
    </div>
  )
}

export default Loading
