import { tw } from '@/shared/utils/tw'
import type { Users } from './create/type/type'
import deleteBtn from '@/shared/assets/icons/delete.svg'

interface Props {
  selectedUserList: Users[]
  setSelectedUserList: React.Dispatch<React.SetStateAction<Users[]>>
  className?: string
}

function UserList({ selectedUserList, setSelectedUserList, className }: Props) {
  const handleDeleteUser = (id: string) => {
    setSelectedUserList(prev => prev.filter(s => s.id !== id))
  }

  return (
    <div>
      <ul className={tw(`flex flex-col px-1 py-3 gap-3`, className)}>
        {selectedUserList &&
          selectedUserList.map(s => (
            <li
              key={s.id}
              className="bg-primary-pale p-3 flex gap-2 rounded-lg text-sm text-black pr-0">
              <div className="w-[88%] flex justify-between flex-wrap">
                <span className="truncate max-w-[50%] min-w-[40%]">
                  {s.nickname}
                </span>
                <span className="truncate max-w-[90%]">{s.email}</span>
              </div>
              <button
                type="button"
                className="cursor-pointer bg-primary-pale"
                onClick={() => handleDeleteUser(s.id)}>
                <img
                  src={deleteBtn}
                  alt="삭제 버튼"
                  className="w-6 hover:scale-92 transition ease-in pl-1"
                />
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default UserList
