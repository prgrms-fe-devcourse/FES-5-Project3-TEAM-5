import cryingBear from '@/shared/assets/momo/momo-cry.png'
import raiseBear from '@/shared/assets/momo/momo-raise.png'
import { useSnackbarStore } from '@/shared/stores/useSnackbarStore'
import { motion, AnimatePresence } from 'framer-motion'
import { useShallow } from 'zustand/shallow'

export const Snackbar = () => {
  const { visible, text, type } = useSnackbarStore(
    useShallow(state => ({
      visible: state.visible,
      text: state.text,
      type: state.type
    }))
  )

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`
            fixed top-10 left-1/2 transform -translate-x-1/2 z-50
            max-w-[320px] w-full px-6 py-3
            flex items-center gap-4
            rounded-xl border
            bg-gradient-to-r
            ${
              type === 'error'
                ? 'from-[#f8d7da] via-[#f5c6cb] to-[#f44336] border-[#d32f2f]' // 은은한 빨강 그라데이션 + 진한 테두리
                : 'from-[#d0f0d8] via-[#a5d6a7] to-[#4caf50] border-[#388e3c]'
            }
            shadow-lg
            backdrop-blur-sm
            text-neutral-900
          `}>
          <img
            src={type === 'error' ? cryingBear : raiseBear}
            className={`${type === 'error' ? 'w-[28px] h-[34px]' : 'w-[30px] h-[30px]'} ml-4`}
          />
          <p className="ml-4 text-sm font-semibold flex items-center">{text}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Snackbar
