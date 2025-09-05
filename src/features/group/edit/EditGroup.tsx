import { useGroupStore } from '@/shared/stores/useGroupStore'
import { useUserStore } from '@/shared/stores/useUserStore'
import { useEffect, useRef, useState } from 'react'
import GroupName from '../create/GroupName'
import Mascot from '../create/Mascot'
import { useNavigate, useParams } from 'react-router'
import Toggle from '../create/Toggle'
import EditBtn from './EditBtn'
import { updateGroupInfo, updateMainStatus } from '../create/service/fetch'
import { useSnackbarStore } from '@/shared/stores/useSnackbarStore'
import Loading from '@/shared/components/loading/Loading'

function EditGroup() {
  const [isOwner, setIsOwner] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [mascot, setMascot] = useState(0)
  const [isMain, setIsMain] = useState(false)
  const [loading, setLoading] = useState(false)

  const { groupId } = useParams<{ groupId: string }>()
  const user = useUserStore(state => state.user)
  const groups = useGroupStore(state => state.groups)
  const fetchGroups = useGroupStore(state => state.fetchGroups)
  const targetGroup = groups.find(g => g.groups.id === groupId)
  const navigate = useNavigate()
  const showSnackbar = useSnackbarStore(state => state.showSnackbar)

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return
      setLoading(true)
      await fetchGroups(user.id) // ✅ 기다려야 로딩이 유지됨
      setLoading(false)
    }
    fetchData()
  }, [user?.id, fetchGroups])

  useEffect(() => {
    if (!targetGroup || !user?.id) return

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.value = targetGroup.groups.name
      }
    }, 0)

    setMascot(targetGroup.groups.mascot)
    setIsMain(targetGroup.is_main)

    setIsOwner(targetGroup.groups.user_id === user.id)
  }, [user?.id, targetGroup])

  const handleEditGroupMascot = (id: number) => {
    setMascot(id)
  }

  const handleEditToggle = (value: boolean) => {
    setIsMain(value)
  }

  const handleSubmit = async () => {
    if (!groupId || !user?.id) return

    try {
      if (isOwner) {
        if (!inputRef.current?.value) return
        await updateGroupInfo(groupId, inputRef.current?.value, mascot)
      }

      await updateMainStatus(groupId, user.id)

      // ✅ 갱신
      await fetchGroups(user.id)
      showSnackbar({ text: '수정 완료!', type: 'success' })
      navigate(`/accountBook/${groupId}/settings`)
    } catch (err) {
      console.error(err)
      alert('수정 중 오류가 발생했습니다.')
    }
  }

  return loading ? (
    <Loading />
  ) : (
    <form className="p-4 flex flex-col gap-7">
      <GroupName
        ref={inputRef}
        disabled={!isOwner}
      />
      <Mascot
        value={mascot}
        onChange={handleEditGroupMascot}
        disabled={!isOwner}
      />

      {!isOwner && (
        <p className="text-sm text-gray-500">
          ⚠️ 소유자만 그룹 정보를 수정할 수 있어요.
        </p>
      )}

      <Toggle
        header="대표 가계부 설정"
        btn1="네"
        btn2="아니오"
        name="mainToggle"
        value={isMain}
        onChange={handleEditToggle} // ✅ 올바르게 전달
      />
      <EditBtn onClick={handleSubmit} />
    </form>
  )
}

export default EditGroup
