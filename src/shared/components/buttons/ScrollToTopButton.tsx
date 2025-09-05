import { tw } from '@/shared/utils/tw'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Props = {
  className?: string
}

export default function ScrollToTopButton({ className }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }


  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="맨 위로 이동"
          className={tw(`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer
          bg-[#FDF2D6] hover:bg-[#ED944A] text-[#ED944A] hover:text-white transition-colors active:scale-95`, className)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
          <svg className="w-[65%] h-[65%]" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.8435 7.65933L13.022 0.459899C12.6033 -0.16384 11.9383 -0.151154 11.5426 0.485977L7.09804 7.63326C6.70228 8.27039 6.97215 8.79193 7.69969 8.79193H9.00245V11.277C9.00245 11.6509 9.14901 12.0094 9.40989 12.2737C9.67077 12.5381 10.0246 12.6866 10.3935 12.6866H14.5668C14.9358 12.6866 15.2896 12.5381 15.5505 12.2737C15.8113 12.0094 15.9579 11.6509 15.9579 11.277V8.79264H17.2781C18.0063 8.79264 18.2616 8.28307 17.8435 7.65933ZM2.49979 16.6158H0.960549C0.282391 16.6158 0 16.114 0 15.6284C0 15.128 0.353337 14.6424 0.960549 14.6424H6.15558C6.76349 14.6424 7.11613 15.128 7.11613 15.6284C7.11613 16.1147 6.83374 16.6158 6.15558 16.6158H4.61773V23.7969C4.61773 24.513 4.16632 24.9133 3.55911 24.9133C2.9519 24.9133 2.50049 24.513 2.50049 23.7969L2.49979 16.6158ZM7.19125 19.7345C7.19125 16.7589 9.16729 14.469 12.0475 14.469C14.8847 14.469 16.9045 16.8308 16.9045 19.7345C16.9045 22.6953 14.9424 25 12.0475 25C9.1812 25 7.19125 22.6953 7.19125 19.7345ZM14.7018 19.7345C14.7018 18.0035 13.8121 16.4431 12.0475 16.4431C10.2829 16.4431 9.39334 18.0035 9.39334 19.7345C9.39334 21.4796 10.2551 23.0245 12.0475 23.0245C13.8407 23.0245 14.7018 21.4796 14.7018 19.7345ZM17.7851 15.7567C17.7851 15.0843 18.1809 14.6417 18.8875 14.6417H21.3852C23.4615 14.6417 25 16.0139 25 18.0606C25 20.1489 23.4051 21.4514 21.4708 21.4514H19.9037V23.7976C19.9037 24.5137 19.4523 24.914 18.8458 24.914C18.2379 24.914 17.7858 24.5137 17.7858 23.7976L17.7851 15.7567ZM19.9037 19.5625H21.3442C22.2324 19.5625 22.7972 18.9043 22.7972 18.0465C22.7972 17.1874 22.2324 16.5298 21.3442 16.5298H19.9037V19.5625Z" fill="currentColor"/>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
