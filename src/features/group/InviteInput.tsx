import AddButton from '@/shared/components/buttons/AddButton'
import Input from '@/shared/components/form/Input'
import InviteList from './create/InviteList'
import { useEffect, useRef, useState } from 'react'
import { debounce } from '@/shared/utils/debounce'
import supabase from '@/supabase/supabase'
import type { Users } from './create/type/type'
import { useSnackbarStore } from '@/shared/stores/useSnackbarStore'
import ConfirmModal from '@/shared/components/modal/ConfirmModal'
import freindMoMo from '@/shared/assets/momo/momo-invite.png'

interface Props {
  selectedUserList: Users[]
  setSelectedUserList: React.Dispatch<React.SetStateAction<Users[]>>
  personal?: boolean
}

function InviteInput({
  selectedUserList,
  setSelectedUserList,
  personal
}: Props) {
  const [userList, setUserList] = useState<Users[]>([])
  const [inputValue, setInputValue] = useState('')
  const [drop, setDrop] = useState(false)
  const [loading, setLoading] = useState(false)
  const [convertState, setConvertState] = useState({
    show: false,
    hasConfirmed: false,
    pendingUser: null as Users | null
  })

  const showSnackbar = useSnackbarStore(state => state.showSnackbar)

  const debouncedFetchUserList = useRef(
    debounce(async (value: string) => {
      if (!value) {
        setUserList([])
        setLoading(false)
        return
      }

      setLoading(true)

      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .or(`nickname.ilike.%${value}%,email.ilike.%${value}%`)

        setLoading(false)

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

  const addUserToList = (user: Users) => {
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

  const handleAddUser = (inputValue: string, personal: boolean | undefined) => {
    const user = userList.find(u => u.email === inputValue)
    if (!user) {
      return
    }

    // 개인 가계부일 경우 모달 먼저 띄우기 (단, 한 번만)
    if (personal && !convertState.hasConfirmed) {
      setConvertState({
        ...convertState,
        show: true,
        pendingUser: user
      })
      return
    }

    // 이미 확인했거나 공동 가계부인 경우 바로 추가
    addUserToList(user)
  }

  const handleConfirmConvert = async () => {
    if (!convertState.pendingUser) return

    // 공동 전환 완료 → 유저 추가
    addUserToList(convertState.pendingUser)

    setConvertState({
      show: false,
      hasConfirmed: true,
      pendingUser: null
    })
  }

  const handleCancelConvert = () => {
    setConvertState(prev => ({
      ...prev,
      show: false,
      pendingUser: null
    }))

    setInputValue('') // 인풋 비우기
  }

  return (
    <>
      <div className="flex justify-between items-center mb-3 relative mt-2">
        <Input
          label="이메일"
          className=""
          onChange={handleInputChange}
          value={inputValue}
          id="inviteUser"
        />
        <AddButton
          size="sm"
          onClick={() => handleAddUser(inputValue, personal)}
          className="absolute z-1 right-4"
        />
        {drop && inputValue && (
          <InviteList
            userList={userList}
            onSelect={handleSelectUser}
            loading={loading}
          />
        )}
      </div>
      <ConfirmModal
        open={convertState.show}
        title="공동 가계부 전환"
        lines={['현재 개인 가계부입니다.', '공동 가계부로 바꾸시겠어요?']}
        onConfirm={handleConfirmConvert}
        onCancel={handleCancelConvert}
        confirmText="확인"
        cancelText="취소"
        imageSrc={freindMoMo}
      />
    </>
  )
}

export default InviteInput
