import SingleTab from "../add/components/SingleTab"
import { useEffect, useRef, useState } from "react"
import AmountInput from "../add/components/AmountInput"
import SelectField from "../add/components/SelectField"
import PaymentModal from "@/shared/components/modal/PaymentModal"
import CategoryModal from "@/shared/components/modal/CategoryModal"
import supabase from "@/supabase/supabase"
import useModalOptions from "../hooks/useModalOptions"


function EditItem() {

  // 임시 값 -> params 값으로 수정 예정
  const id = "723ab28a-9db4-494b-8d3f-380017910436"

  // 아이템 데이터 state
  const [amount, setAmount] = useState("") // 금액
  const [itemType, setItemType] = useState<"수입" | "지출">("지출") //분류
  const [date, setDate] = useState("") // 날짜
  const [imageUrl, setImageUrl] = useState<string | null>(null) // 사진
  const [memo, setMemo] = useState("") // 메모

  const [selectedFile, setSelectedFile] = useState<File | null>(null) // 업로드한 사진 객체
  const fileInputRef = useRef<HTMLInputElement>(null) // hidden 처리된 file input 클릭하기 위한 ref

  // 모달 열림 상태
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false) // 결제 수단 설정 모달
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false) // 분류 설정 모달

  // 결제 수단 + 카테고리 모달 데이터 패칭 커스텀 훅
  const { methods, categories } = useModalOptions()

  // 결제 수단
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null) // 결제 수단 id
  const selectedMethodType =
    methods.find(m => m.id === selectedMethodId)?.type ?? '' // 결제 수단 uuid → type 변환

  // 카테고리
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const selectedCategoryName = categories.find(c => c.id === selectedCategoryId)?.korean_name ?? ''

  // 아이템 데이터 패칭
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("account_items")
        .select(`
          id, amount, type, date, memo, receipt_url, category_id, payment_method_id`)
        .eq("id", id)
        .single()

      if (error) {
        console.error("아이템 불러오기 실패:", error)
        return
      }

      // 받아온 데이터 state에 채우기
      setAmount(data.amount.toString())
      setItemType(data.type === "income" ? "수입" : "지출")
      setDate(data.date)
      setMemo(data.memo ?? "")
      setImageUrl(data.receipt_url ?? null)
      setSelectedCategoryId(data.category_id)
      setSelectedMethodId(data.payment_method_id)
    })()
  }, [id])


  // 파일 선택
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setImageUrl(URL.createObjectURL(file))
    }
    e.target.value = "" // 같은 파일 다시 선택 가능하게 초기화
  }

  // 파일명 추출
  const getFileNameFromUrl = (url: string | null) => {
    if (!url) return null
    try {
      const parts = url.split("/") // 경로 분리
      const fileName = parts[parts.length - 1] // 마지막만 추출
      return fileName || null
    } catch {
      return null
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
        <div className="mb-3 flex justify-start">
          <span className="text-neutral-dark font-bold h-10 flex items-center">
            {date}
          </span>
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
              value={selectedFile ? selectedFile.name : getFileNameFromUrl(imageUrl) ?? null}
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
                <svg
                  width="20"
                  height="17"
                  viewBox="0 0 20 17"
                  className="mb-1"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.99967 13.4998C12.3008 13.4998 14.1663 11.6343 14.1663 9.33317C14.1663 7.032 12.3008 5.1665 9.99967 5.1665C7.69849 5.1665 5.83301 7.032 5.83301 9.33317C5.83301 11.6343 7.69849 13.4998 9.99967 13.4998ZM9.99967 11.8391C8.61567 11.8391 7.49376 10.7172 7.49376 9.33317C7.49376 7.94917 8.61567 6.82725 9.99967 6.82725C11.3837 6.82725 12.5056 7.94917 12.5056 9.33317C12.5056 10.7172 11.3837 11.8391 9.99967 11.8391Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.96763 0.166504C6.82047 0.166504 5.82051 0.947246 5.54227 2.06016L5.18236 3.49984H3.33301C1.9523 3.49984 0.833008 4.61913 0.833008 5.99984V14.3332C0.833008 15.7139 1.9523 16.8332 3.33301 16.8332H16.6663C18.0471 16.8332 19.1663 15.7139 19.1663 14.3332V5.99984C19.1663 4.61913 18.0471 3.49984 16.6663 3.49984H14.817L14.4571 2.06016C14.1788 0.947246 13.1789 0.166504 12.0317 0.166504H7.96763ZM7.15918 2.46439C7.25192 2.09342 7.58524 1.83317 7.96763 1.83317H12.0317C12.4141 1.83317 12.7474 2.09342 12.8402 2.46439L13.2001 3.90406C13.3856 4.64601 14.0522 5.1665 14.817 5.1665H16.6663C17.1266 5.1665 17.4997 5.5396 17.4997 5.99984V14.3332C17.4997 14.7934 17.1266 15.1665 16.6663 15.1665H3.33301C2.87277 15.1665 2.49967 14.7934 2.49967 14.3332V5.99984C2.49967 5.5396 2.87277 5.1665 3.33301 5.1665H5.18236C5.94714 5.1665 6.61377 4.64601 6.79927 3.90406L7.15918 2.46439Z"
                    fill="currentColor"
                  />
                </svg>
                <p>사진 미리보기</p>
              </div>
            )}
          </div>

          
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
        filterType={itemType === "수입" ? "income" : "expense"} // 나중에 수정하기
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