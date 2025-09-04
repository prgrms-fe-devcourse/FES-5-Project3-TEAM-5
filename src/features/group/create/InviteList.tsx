import Loading from '@/shared/components/loading/Loading'
import type { Users } from './type/type'
import { AnimatePresence, motion } from 'framer-motion'
import { useUserStore } from '@/shared/stores/useUserStore'

interface Props {
  userList: Users[]
  onSelect: (user: Users) => Promise<void>
  loading: boolean
}

function InviteList({ userList = [], onSelect, loading }: Props) {
  const user = useUserStore(state => state.user)

  const handleGetValue = async (
    e: React.MouseEvent<HTMLElement>,
    user: Users
  ) => {
    e.preventDefault()
    await onSelect(user)
  }

  const filteredList = userList.filter(u => u.id !== user?.id)

  return (
    <div className="absolute top-12 p-3 flex flex-wrap justify-start gap-5 bg-gray-100 w-full h-50 overflow-y-scroll rounded-lg text-neutral-dark custom-scrollbar">
      {loading ? (
        <Loading size={38} />
      ) : userList.length === 0 ? (
        <span className="w-full text-sm text-center text-neutral-500 py-4">
          찾으시는 결과가 없어요 🫤
        </span>
      ) : (
        <AnimatePresence>
          <ul className="flex flex-col gap-3 w-full">
            {userList &&
              filteredList.map(u => (
                <motion.li
                  key={u.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-wrap justify-between rounded-lg text-sm hover:text-black">
                  <button
                    type="button"
                    onClick={e => handleGetValue(e, u)}
                    className="cursor-pointer flex gap-4">
                    <span className="">{u.nickname}</span>
                    <span className="text-sm">{u.email}</span>
                  </button>
                </motion.li>
              ))}
          </ul>
        </AnimatePresence>
      )}
    </div>
  )
}

export default InviteList
