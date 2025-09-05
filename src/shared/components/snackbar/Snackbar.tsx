import { useSnackbarStore } from '@/shared/stores/useSnackbarStore'
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion'
import { useShallow } from 'zustand/shallow'

type Variant = 'success' | 'error' | 'info' | 'warning'

const variantMap: Record<
  Variant,
  {
    stripe: string
    iconBg: string
    iconFg: string
    title: string
  }
> = {
  success: {
    stripe: 'bg-[#22c55e]',
    iconBg: 'bg-[#dcfce7]',
    iconFg: 'text-[#16a34a]',
    title: 'Success'
  },
  error: {
    stripe: 'bg-[#ef4444]',
    iconBg: 'bg-[#fee2e2]',
    iconFg: 'text-[#dc2626]',
    title: 'Error'
  },
  info: {
    stripe: 'bg-[#3b82f6]',
    iconBg: 'bg-[#dbeafe]',
    iconFg: 'text-[#2563eb]',
    title: 'Info'
  },
  warning: {
    stripe: 'bg-[#f59e0b]',
    iconBg: 'bg-[#fef3c7]',
    iconFg: 'text-[#d97706]',
    title: 'Warning'
  }
}

const Icon = ({ type }: { type: Variant }) => {
  const cfg = variantMap[type]

  return (
    <div
      className={`w-8 h-8 rounded-full grid place-items-center ${cfg.iconBg}`}>
      {type === 'success' && (
        <svg
          className={`w-5 h-5 ${cfg.iconFg}`}
          viewBox="0 0 24 24"
          fill="none">
          <path
            d="M20 6L9 17l-5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {type === 'error' && (
        <svg
          className={`w-5 h-5 ${cfg.iconFg}`}
          viewBox="0 0 24 24"
          fill="none">
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
      {type === 'info' && (
        <svg
          className={`w-5 h-5 ${cfg.iconFg}`}
          viewBox="0 0 24 24"
          fill="none">
          <path
            d="M12 8h.01M11 12h2v6h-2z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      )}
      {type === 'warning' && (
        <svg
          className={`w-5 h-5 ${cfg.iconFg}`}
          viewBox="0 0 24 24"
          fill="none">
          <path
            d="M12 9v4m0 4h.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  )
}

export const Snackbar = () => {
  const { toasts, hideSnackbar } = useSnackbarStore(
    useShallow(state => ({
      toasts: state.toasts,
      hideSnackbar: state.hideSnackbar
    }))
  )

  return (
    <div className="fixed top-10 left-[50%] -translate-x-1/2 transform z-[1000] flex flex-col gap-3">
      <LayoutGroup>
        <AnimatePresence initial={false}>
          {toasts.map(t => {
            const cfg = variantMap[t.type]
            return (
              <motion.div
                layout
                key={t.id}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative w-[250px] sm:w-[350px]">
                <div className="relative rounded-xl bg-white shadow-lg border border-neutral-200 pl-4 pr-3 py-3">
                  <div
                    className={`absolute -left-1 top-0 h-full w-2.5 rounded-l-xl ${cfg.stripe}`}
                  />
                  <div className="flex items-center gap-3">
                    <Icon type={t.type} />
                    <div className="flex-1">
                      <div className="text-neutral-900 font-semibold">
                        {cfg.title}
                      </div>
                      <div className="text-neutral-700 sm:text-sm mt-0.5 whitespace-pre-line text-[9px]">
                        {t.text}
                      </div>
                    </div>
                    <button
                      aria-label="닫기"
                      onClick={() => hideSnackbar(t.id)}
                      className="p-1 rounded-md hover:bg-neutral-100 transition">
                      <svg
                        className="w-4 h-4 text-neutral-500"
                        viewBox="0 0 24 24"
                        fill="none">
                        <path
                          d="M6 6l12 12M18 6L6 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  )
}

export default Snackbar
