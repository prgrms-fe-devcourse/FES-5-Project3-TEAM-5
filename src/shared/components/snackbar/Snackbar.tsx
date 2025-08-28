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
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5 }}
          className={`
                    ${type === 'error' ? 'bg-[#df5448]' : 'bg-[#20a773]'} 
                    text-white px-4 py-2 rounded-tl-2xl rounded-tr-2xl fixed bottom-0 left-1/2 transform -translate-x-1/2 shadow-lg
                    w-full max-w-[420px] h-25 z-2 flex items-center gap-2
                `}>
          <img
            src={type === 'error' ? cryingBear : raiseBear}
            className={`${type === 'error' ? 'w-[63px] h-[90px]' : 'w-[70px] h-[80px] mt-1'} ml-4`}
          />
          <p className="ml-4 text-lg font-semibold flex items-center">{text}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Snackbar
