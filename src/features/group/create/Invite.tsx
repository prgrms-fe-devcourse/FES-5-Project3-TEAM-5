import type { Users } from './type/type'
import InviteInput from '../InviteInput'
import UserList from '../UserList'

interface Props {
  selectedUserList: Users[]
  setSelectedUserList: React.Dispatch<React.SetStateAction<Users[]>>
}

function Invite({ selectedUserList, setSelectedUserList }: Props) {
  return (
    <div>
      <label
        className="text-neutral-dark font-semibold"
        htmlFor="inviteUser">
        초대하기
      </label>
      <InviteInput
        selectedUserList={selectedUserList}
        setSelectedUserList={setSelectedUserList}
      />
      <UserList
        selectedUserList={selectedUserList}
        setSelectedUserList={setSelectedUserList}
        className="border-1 w-full h-30 overflow-y-scroll custom-scrollbar rounded-md"
      />
    </div>
  )
}

export default Invite
