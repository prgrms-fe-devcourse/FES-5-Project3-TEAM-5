import BinaryTabs from '@/pages/item/add/components/BinaryTabs'
import invite from '@/shared/assets/momo/momo-invite.png'
import { useEffect, useState } from 'react'
import InviteInput from '../../InviteInput'
import { useCreateGroup } from '../../create/hook/useCreateGroup'
import UserList from '../../UserList'
import InvitedList from './InvitedList'
import { useGroupStore } from '@/shared/stores/useGroupStore'
import { useShallow } from 'zustand/shallow'
import { useUserStore } from '@/shared/stores/useUserStore'
import { useParams } from 'react-router'
import InviteCompleteBtn from './InviteCompleteBtn'
import Loading from '@/shared/components/loading/Loading'

function Invitation() {
  const [tab, setTab] = useState<'초대하기' | '초대한 사람 목록'>('초대하기') // 탭 상태
  const [personal, setPersonal] = useState(false)
  const { invitedUsers, setInvitedUsers } = useCreateGroup()
  const { groupId } = useParams()

  const { groups, fetchGroups, isLoading } = useGroupStore(
    useShallow(state => ({
      groups: state.groups,
      fetchGroups: state.fetchGroups,
      isLoading: state.isLoading
    }))
  )

  const user = useUserStore(state => state.user)

  useEffect(() => {
    if (!user?.id) return
    fetchGroups(user.id)
  }, [user?.id])

  useEffect(() => {
    if (!groupId || groups.length === 0) return

    const target = groups.find(g => g.group_id === groupId)

    if (target) {
      setPersonal(target.groups.is_personal)
    }
  }, [groupId, groups])

  return (
    <div className="flex flex-col px-2">
      <label
        className="text-neutral-dark font-semibold"
        htmlFor="inviteUser"
        hidden></label>
      <div className="flex  justify-center items-center">
        <img
          src={invite}
          alt="모모와 모모친구"
          className="w-40"
        />
      </div>
      <BinaryTabs
        value={tab}
        onChange={setTab}
        options={['초대하기', '초대한 사람 목록']}
      />
      {isLoading ? (
        <Loading imgClassName="w-30" />
      ) : tab === '초대하기' ? (
        <form className="px-2 py-3 relative">
          <InviteInput
            selectedUserList={invitedUsers}
            setSelectedUserList={setInvitedUsers}
            personal={personal}
          />
          <UserList
            selectedUserList={invitedUsers}
            setSelectedUserList={setInvitedUsers}
          />
          <InviteCompleteBtn
            personal={personal}
            invitedUsers={invitedUsers}
            groupId={groupId}
            user={user}
          />
        </form>
      ) : tab === '초대한 사람 목록' ? (
        <InvitedList />
      ) : null}
    </div>
  )
}

export default Invitation
