import SingleTab from "../add/components/SingleTab"
import { useRef, useState } from "react"
import AmountInput from "../add/components/AmountInput"
import SelectField from "../add/components/SelectField"
import PaymentModal from "@/shared/components/modal/PaymentModal"
import CategoryModal from "@/shared/components/modal/CategoryModal"
import useModalOptions from "../hooks/useModalOptions"
import dayjs from "dayjs"
import GuideMessage from "../components/GuideMessage"
import SubmitButton from "@/shared/components/form/SubmitButton"
import { Badge } from "@/features/calendar/ui/overlay/Badge"
import useEditItem from "../hooks/useEditItem"
import cameraIcon from "@/shared/assets/icons/camera.svg"
import { useNavigate, useParams } from "react-router"
import supabase from "@/supabase/supabase"
import { updateAccountItem } from "./updateAccountItem"


function EditItem() {

  const { id } = useParams<{ id: string }>()

  const nav = useNavigate()

  // 아이템 데이터 state
  const {
    amount, setAmount,
    itemType,
    date,
    memo, setMemo,
    imageUrl, setImageUrl,
    selectedCategoryId, setSelectedCategoryId,
    selectedMethodId, setSelectedMethodId,
    hasInstallment,
    hasRecurring,
  } = useEditItem(id!)

  const [selectedFile, setSelectedFile] = useState<File | null>(null) // 업로드한 사진 객체
  const fileInputRef = useRef<HTMLInputElement>(null) // hidden 처리된 file input 클릭하기 위한 ref

  // 모달 열림 상태
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false) // 결제 수단 설정 모달
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false) // 분류 설정 모달

  // 결제 수단 + 카테고리 모달 데이터 패칭 커스텀 훅
  const { methods, categories } = useModalOptions()

  // 결제 수단 uuid → type 변환
  const selectedMethodType = methods.find(m => m.id === selectedMethodId)?.type ?? ''

  // 카테고리 uuid → korean_name 변환
  const selectedCategoryName = categories.find(c => c.id === selectedCategoryId)?.korean_name ?? ''

  // 파일 선택
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setImageUrl(URL.createObjectURL(file))
    }
    e.target.value = "" // 같은 파일 다시 선택 가능하게 초기화
  }

  // DB 업데이트
  const handleSubmit = async () => {
    if (Number(amount) < 100) {
      console.error('금액은 최소 100원 이상이어야 합니다.')
      return
    }

    try{
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error('로그인이 필요합니다.')

      const userId = userData.user.id

      const result = await updateAccountItem({
        id: id!,
        amount: Number(amount),
        categoryId: selectedCategoryId,
        paymentMethodId: itemType === '지출' ? selectedMethodId : null,
        memo,
        file: selectedFile,
        userId,
        prevReceiptUrl: imageUrl,
      })

      nav(-1) // 이전 히스토리로 이동

      // const formattedDate = dayjs(date).format("YYYY-MM-DD")
      // nav(`/accountBook/calendar/detail/${formattedDate}/${id}`, {
      //   replace: true,
      // })

      console.warn('업데이트 성공:', result)
    } catch(err) {
      const e = err as {
        message?: string
        details?: string
        hint?: string
        code?: string
      }
      console.error('업데이트 실패 전체 에러:', e)
      console.error('message:', e.message)
      console.error('details:', e.details)
      console.error('hint:', e.hint)
      console.error('code:', e.code)
    }
  }


  return (
    <>
      {/* 상단 탭 */}
      <div className="mb-3">
        <SingleTab label={itemType} />
      </div>

      <div className="p-4">
        {/* 날짜 */}
        <div className="mb-3 flex items-center gap-2"> {/* justify-between 고민 */}
          <span className="text-neutral-dark font-bold h-10 flex items-center">
            {date && dayjs(date).format("YYYY. M. D.")}
          </span>
            {hasRecurring && <Badge variant="repeat">반복</Badge>}
            {hasInstallment && <Badge variant="installment">할부</Badge>}
        </div>

        {/* 폼 */}
        <form className="space-y-3">
          {/* 금액 */}
          <div>
            <AmountInput
              value={amount}
              onChange={setAmount}
              tab={itemType}
              hideButton
            />
          </div>

          {/* 분류 */}
          <div>
            <SelectField
              label="분류"
              value={selectedCategoryName}
              placeholder="분류를 선택해 주세요"
              onClick={() => setIsCategoryModalOpen(true)}
            />
          </div>

          {/* 수단 */}
          {itemType === '지출' && (
            <div>
              <SelectField
                label="수단"
                value={selectedMethodType}
                placeholder="결제수단을 선택해 주세요"
                onClick={() => setIsPaymentModalOpen(true)}
              />
            </div>
          )}

          {/* 사진 */}
          <div>
            <SelectField
              label="사진"
              value={selectedFile ? selectedFile.name : (imageUrl ? "기존 첨부 파일" : null)}
              placeholder="사진을 업로드해 주세요"
              onClick={() => fileInputRef.current?.click()}
              onButtonClick={() => {
                setSelectedFile(null)
                setImageUrl(null)
              }}
              hideButton={!(imageUrl || selectedFile)}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* 사진 미리보기 */}
          <div className="bg-neutral-light h-40 rounded-lg flex items-center justify-center overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="이미지 미리보기"
                className="object-contain h-full"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-neutral-dark">
                <img src={cameraIcon} alt="" className="mb-1"/>
                <p>사진 미리보기</p>
              </div>
            )}
          </div>

          {/* 메모 */}
          <div className="flex flex-col gap-2">
            <span className="text-base text-neutral-dark font-bold">메모</span>
            <textarea
              name="memo"
              id="memo"
              placeholder="메모를 입력해 주세요"
              value={memo}
              onChange={e => setMemo(e.target.value)}
              className="px-2.5 py-2 border-2 border-neutral-light rounded-lg focus:outline-none focus:border-primary-light placeholder:text-neutral-dark resize-none"
              rows={4}
            />
          </div>

          {/* 안내 문구 */}
          <GuideMessage
            amount={amount}
            type={itemType}   // EditItem에서는 itemType = "수입" | "지출"
            selectedCategoryId={selectedCategoryId}
            selectedMethodId={selectedMethodId}
          />

          <SubmitButton
            text="수정 완료"
            onClick={handleSubmit}
            disabled={!amount || !selectedCategoryId || (itemType === '지출' && !selectedMethodId) || Number(amount) < 100 || Number(amount) > 99999999}
          />
          
        </form>
      </div>

      {/* 결제수단 모달 */}
      <PaymentModal
        open={isPaymentModalOpen}
        methods={methods}
        onClose={() => setIsPaymentModalOpen(false)}
        onSelect={id => {
          console.warn('선택한 결제수단 uuid:', id) // 제대로 보이는지 콘솔에서 확인
          setSelectedMethodId(id) // 선택한 결제 수단 uuid 저장
          setIsPaymentModalOpen(false)
        }}
      />

      {/* 카테고리 모달 */}
      <CategoryModal
        open={isCategoryModalOpen}
        categories={categories}
        filterType={itemType === "수입" ? "income" : "expense"}
        onClose={() => setIsCategoryModalOpen(false)}
        onSelect={id => {
          console.warn('선택한 카테고리 uuid:', id) // 제대로 보이는지 콘솔에서 확인
          setSelectedCategoryId(id) // 선택한 카테고리 uuid 저장
          setIsCategoryModalOpen(false)
        }}
      />
    </>
  )
}
export default EditItem