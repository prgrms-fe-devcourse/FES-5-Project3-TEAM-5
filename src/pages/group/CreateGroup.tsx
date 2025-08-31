import CreateBtn from '@/features/group/create/CreateBtn'
import GroupName from '@/features/group/create/GroupName'
import { useCreateGroup } from '@/features/group/create/hook/useCreateGroup'
import Invite from '@/features/group/create/Invite'
import Mascot from '@/features/group/create/Mascot'
import Toggle from '@/features/group/create/Toggle'
import Loading from '@/shared/components/loading/Loading'

function CreateGroup() {
  const {
    groupName,
    setGroupName,
    mascot,
    setMascot,
    isMain,
    setIsMain,
    isGroup,
    setIsGroup,
    invitedUsers,
    setInvitedUsers,
    handleSubmit
  } = useCreateGroup()

  return (
    <div>
      {isMain === null ? (
        <Loading />
      ) : (
        <form
          className="p-4 flex flex-col gap-7"
          onSubmit={handleSubmit}>
          <GroupName
            value={groupName}
            onChange={setGroupName}
          />
          <Mascot
            value={mascot}
            onChange={setMascot}
          />
          <Toggle
            header="대표 가계부 설정"
            btn1="네"
            btn2="아니오"
            name="mainToggle"
            value={isMain}
            onChange={setIsMain}
          />
          <Toggle
            header="가계부 설정"
            btn1="개인"
            btn2="그룹"
            name="groupToggle"
            value={isGroup}
            onChange={setIsGroup}
            className={`${isGroup && 'mb-28'}`}
          />
          {!isGroup && (
            <Invite
              selectedUserList={invitedUsers}
              setSelectedUserList={setInvitedUsers}
            />
          )}
          <CreateBtn />
        </form>
      )}
    </div>
  )
}

export default CreateGroup
