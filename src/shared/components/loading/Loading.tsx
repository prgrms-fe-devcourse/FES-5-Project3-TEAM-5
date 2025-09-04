import { tw } from '@/shared/utils/tw'
import { motion } from 'framer-motion'

export const Loading = ({
  text,
  size = 48,
  className
}: {
  text?: React.ReactNode
  size?: number
  className?: string
}) => {
  const segments = 12
  const radius = size / 2 - 12 // 반경 조정
  const segmentWidth = size / 8
  const segmentHeight = size / 4
  const animationDuration = 1.2

  return (
    <div
      className={tw(
        `flex flex-col items-center justify-center w-full h-full`,
        className
      )}>
      {text && (
        <div className=" text-center text-sm text-primary-base absolute -top-10">
          {text}
        </div>
      )}

      <div
        style={{ width: size, height: size }}
        className=""
        aria-label="Loading spinner"
        role="status">
        {[...Array(segments)].map((_, i) => {
          const angle = (360 / segments) * i

          return (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                top: '46%',
                left: '50%',
                width: segmentWidth,
                height: segmentHeight,
                backgroundColor: '#fdf2d6',
                borderRadius: segmentWidth / 2,
                transformOrigin: `50% ${radius + segmentHeight / 2}px`,
                transform: `rotate(${angle}deg) translateY(-${radius}px) translateX(-50%)`
              }}
              animate={{
                backgroundColor: ['#fdf2d6', '#f9d376', '#fdf2d6']
              }}
              transition={{
                duration: animationDuration,
                repeat: Infinity,
                delay: (animationDuration / segments) * i,
                ease: 'linear'
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Loading
