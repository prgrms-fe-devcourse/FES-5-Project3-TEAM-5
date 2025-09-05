import ConfirmModal from '@/shared/components/modal/ConfirmModal'
import { useSnackbarStore } from '@/shared/stores/useSnackbarStore'
import { useUserStore } from '@/shared/stores/useUserStore'
import supabase from '@/supabase/supabase'
import { type Dispatch, type SetStateAction } from 'react'
import { useNavigate, useParams } from 'react-router'
import type { Delete } from '../../model/groupDelete'

interface Props {
  isDelete: {
    isOwner: boolean | null
    delete: boolean
  }
  onCancel: () => void
  setIsDelete: Dispatch<SetStateAction<Delete>>
}

function DeleteModal({ isDelete, onCancel }: Props) {
  const { isOwner, delete: isDeleteFlag } = isDelete
  const navigate = useNavigate()
  const { groupId } = useParams()
  const user = useUserStore(state => state.user)

  const showSnackbar = useSnackbarStore(state => state.showSnackbar)

  const handleDelete = async () => {
    if (!groupId || !user?.id) return
    // ✅ 대표 가계부인지 직접 확인
    const { data: mainData, error: mainError } = await supabase
      .from('group_members')
      .select('is_main')
      .eq('group_id', groupId)
      .eq('user_id', user.id)
      .single()

    if (mainError) {
      console.error('대표 가계부 여부 확인 실패', mainError)
      return
    }

    if (mainData?.is_main === true) {
      showSnackbar({
        text: '대표 가계부는 삭제할 수 없어요.\n다른 가계부를 먼저 대표로 지정하세요.',
        type: 'error'
      })
      onCancel() // ConfirmModal 닫기
      return
    }

    if (isOwner) {
      // 그룹 자체 삭제 (CASCADE로 멤버와 기록도 함께 삭제됨)
      const { error } = await supabase.from('groups').delete().eq('id', groupId)

      if (error) {
        console.error('그룹 삭제 실패:', error)
        return
      }

      navigate('/') // 또는 그룹 목록 페이지
    } else {
      // 멤버 테이블에서 나 삭제
      const { error: memberError } = await supabase
        .from('group_members')
        .delete()
        .eq('group_id', groupId)
        .eq('user_id', user.id)

      if (memberError) {
        console.error('멤버 삭제 실패:', memberError)
        return
      }

      navigate('/') // 또는 그룹 목록 페이지
    }
  }

  return (
    <div>
      <ConfirmModal
        open={isDeleteFlag}
        title="가계부 삭제"
        lines={
          isOwner
            ? ['가계부가 삭제돼요.', '그래도 진행하시겠어요?']
            : ['내가 작성한 기록은 모두 지워져요. ', '그래도 진행하시겠어요?']
        }
        onConfirm={handleDelete}
        onCancel={onCancel}
        confirmText="확인"
        cancelText="취소"
      />
    </div>
  )
}

export default DeleteModal
