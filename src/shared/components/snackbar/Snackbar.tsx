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
          transition={{ duration: 0.5 }}
          className={`
                    ${type === 'error' ? 'border-[#df5448]' : 'border-[#20a773]'} border-1
                    text-black px-4 py-2 fixed top-10 left-1/2 transform -translate-x-1/2 shadow-xl rounded-xl
                    w-60 max-w-[300px] h-12 z-2 flex items-center gap-2 bg-white
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
