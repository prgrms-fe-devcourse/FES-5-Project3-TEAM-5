import AddButton from '@/shared/components/buttons/AddButton'
import Input from '@/shared/components/form/Input'
import supabase from '@/supabase/supabase'
import { useEffect, useRef, useState } from 'react'
import InviteList from './InviteList'
import type { Users } from './type/type'
import type { UUID } from 'crypto'
import { debounce } from '@/shared/utils/debounce'
import { useSnackbarStore } from '@/shared/stores/useSnackbarStore'

interface Props {
  groupId: UUID
  selectedUserList: Users[]
  setSelectedUserList: React.Dispatch<React.SetStateAction<Users[]>>
}

function Invite({ groupId, selectedUserList, setSelectedUserList }: Props) {
  const [userList, setUserList] = useState<Users[]>([])
  const [inputValue, setInputValue] = useState('')
  const [drop, setDrop] = useState(false)
  const [loading, setLoading] = useState(false)

  const showSnackbar = useSnackbarStore(state => state.showSnackbar)

  const debouncedFetchUserList = useRef(
    debounce(async (value: string) => {
      if (!value) {
        setUserList([])
        setLoading(false)
        return
      }

      setLoading(true)
      console.log('로딩중')

      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .or(`nickname.ilike.%${value}%,email.ilike.%${value}%`)

        setLoading(false)
        console.log('로딩끝')

        if (data) {
          setUserList(data)
        }

        if (error) {
          console.error(error)
        }
      } catch (err) {
        console.error('Fetch failed', err)
        setLoading(false)
      }
    }, 500)
  ).current

  useEffect(() => {
    debouncedFetchUserList(inputValue)
  }, [inputValue])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
    setDrop(true)
  }

  const handleSelectUser = async (user: Users) => {
    setDrop(false)
    setInputValue(user.email)
  }

  const handleAddUser = (inputValue: string) => {
    const user = userList.find(u => u.email === inputValue)
    if (!user) {
      return
    }

    const alreadyAdded = selectedUserList.some(u => u.id === user.id)
    if (alreadyAdded) {
      showSnackbar({ text: '이미 추가된 유저입니다', type: 'error' })
      return
    }

    setSelectedUserList(prev => [
      ...prev,
      {
        nickname: user.nickname,
        id: user.id,
        email: user.email,
        created_at: user.created_at
      }
    ])

    setInputValue('')
    setDrop(false)
  }

  const handleDeleteUser = (id: string) => {
    console.log('삭제')
    setSelectedUserList(prev => prev.filter(s => s.id !== id))
  }

  return (
    <div className="mb-10">
      <label
        className="text-neutral-dark font-semibold"
        htmlFor="inviteUser">
        초대하기
      </label>
      <div className="flex justify-between items-center mb-3 relative mt-2">
        <Input
          label="이메일"
          className="sm:w-88 w-75"
          onChange={handleInputChange}
          value={inputValue}
          id="inviteUser"
        />
        <AddButton
          size="sm"
          onClick={() => handleAddUser(inputValue)}
        />
        {drop && inputValue && (
          <InviteList
            userList={userList}
            onSelect={handleSelectUser}
            loading={loading}
          />
        )}
      </div>
      <div>
        <ul className="flex flex-col gap-3">
          {selectedUserList &&
            selectedUserList.map(s => (
              <li
                key={s.id}
                className="bg-primary-pale p-3 flex gap-2 rounded-lg text-sm text-black">
                <button className="w-[88%] flex justify-between flex-wrap">
                  <span className="truncate max-w-[50%]">{s.nickname}</span>
                  <span className="truncate max-w-[90%]">{s.email}</span>
                </button>
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => handleDeleteUser(s.id)}>
                  삭제
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Invite
