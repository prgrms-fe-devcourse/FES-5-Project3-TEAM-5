import { useEffect, useRef, useState } from 'react'
import BinaryTabs from './components/BinaryTabs'
import SubmitButton from '@/shared/components/form/SubmitButton'
import AmountInput from './components/AmountInput'
import SelectField from './components/SelectField'
import PaymentModal from '@/shared/components/modal/PaymentModal'
import supabase from '@/supabase/supabase'
import CategoryModal from '@/shared/components/modal/CategoryModal'
import IncomeModal from '@/shared/components/modal/IncomeModal'
import ExpenseModal from '@/shared/components/modal/ExpenseModal'
import cameraIcon from '@/shared/assets/icons/camera.svg'

import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { saveAccountItem } from './saveAccountItem'
import type { RepeatInstallmentData } from './saveAccountItem'
import { PickDate, useSelectedDate } from '@/features/calendar'
import { useNavigate } from 'react-router'
import useModalOptions from '../hooks/useModalOptions'
import GuideMessage from '../components/GuideMessage'
import { useSnackbarStore } from '@/shared/stores/useSnackbarStore'
dayjs.locale('ko')

function AddItem() {
  const date = useSelectedDate(s => s.date)

  const [tab, setTab] = useState<'수입' | '지출'>('수입') // 탭 상태
  const [amount, setAmount] = useState('') // 금액
  const memoRef = useRef<HTMLTextAreaElement>(null) // 메모 내용

  const showSnackbar = useSnackbarStore(state => state.showSnackbar) // 스낵바

  const [selectedFile, setSelectedFile] = useState<File | null>(null) // 업로드한 사진 객체
  const [imageUrl, setImageUrl] = useState<string | null>(null) // 미리보기 사진 url
  const fileInputRef = useRef<HTMLInputElement>(null) // hidden 처리된 file input 클릭하기 위한 ref

  const nav = useNavigate()

  const [isSubmitting, setIsSubmitting] = useState(false) // 중복 생성 방지 상태

  // 모달 열림 상태
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false) // 결제 수단 설정 모달
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false) // 분류 설정 모달
  const [isRepeatInstallmentModalOpen, setIsRepeatInstallmentModalOpen] =
    useState(false) // 반복|할부 설정 모달

  // 결제 수단 + 카테고리 모달 데이터 패칭 커스텀 훅
  const { methods, categories } = useModalOptions()

  // 결제 수단
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null) // 결제 수단 id
  const selectedMethodType =
    methods.find(m => m.id === selectedMethodId)?.type ?? '' // 결제 수단 uuid → type 변환

  // 카테고리
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  )
  const selectedCategoryName =
    categories.find(c => c.id === selectedCategoryId)?.korean_name ?? ''

  // 현재 탭 상태 필터
  const filterType = tab === '수입' ? 'income' : 'expense'

  const [incomeRepeatData, setIncomeRepeatData] = useState<
    RepeatInstallmentData | undefined
  >(undefined) // 수입 - 반복 모달 데이터
  const [expenseRepeatInstallmentData, setExpenseRepeatInstallmentData] =
    useState<RepeatInstallmentData | undefined>(undefined) // 지출 - 반복|할부 모달 데이터

  // 반복|할부 설정 여부에 따라 색깔 바꾸기
  const activeOption =
    tab === '수입'
      ? incomeRepeatData
        ? 'repeat'
        : 'none' // 수입에서 반복 설정을 했다면 색깔 바꾸기
      : expenseRepeatInstallmentData
        ? expenseRepeatInstallmentData.mode === '반복'
          ? 'repeat'
          : 'installment' // 지출에서 반복과 할부 여부에 따라 색깔 바꾸기
        : 'none'

  // DB 저장
  const handleSubmit = async () => {
    if (Number(amount) < 100) {
      return
    }
    if (
      tab === '수입' &&
      incomeRepeatData &&
      dayjs(incomeRepeatData.endDate).isBefore(dayjs(date), 'day')
    ) {
      showSnackbar({
        text: '종료일이 생성일 이전일 수 없습니다.',
        type: 'error'
      })
      return
    }
    if (
      tab === '지출' &&
      expenseRepeatInstallmentData &&
      dayjs(expenseRepeatInstallmentData.endDate).isBefore(dayjs(date), 'day')
    ) {
      showSnackbar({
        text: '종료일이 생성일 이전일 수 없습니다.',
        type: 'error'
      })
      return
    }

    if (isSubmitting) return // 중복 생성 방지
    setIsSubmitting(true) // 버튼 클릭 시 잠금

    try {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error('로그인이 필요합니다.')

      const userId = userData.user.id

      await saveAccountItem({
        amount: Number(amount),
        type: tab === '수입' ? 'income' : 'expense',
        date: dayjs(date).format('YYYY-MM-DD'),
        userId,
        groupId: localStorage.getItem('storageGroup') || '',
        categoryId: selectedCategoryId,
        paymentMethodId: tab === '지출' ? selectedMethodId : null,
        memo: memoRef.current?.value ?? null,
        file: selectedFile,
        repeatInstallmentData:
          tab === '수입' ? incomeRepeatData : expenseRepeatInstallmentData
      })
      showSnackbar({ type: "success", text: `${tab} 내역이 작성되었습니다` })

      nav(`/accountBook/${localStorage.getItem('storageGroup')}/calendar`, {
        replace: true
      })

    } catch {
        setIsSubmitting(false) // 다시 활성화
        showSnackbar({
          text: '저장 중 오류가 발생했습니다',
          type: 'error'
        })
      }
  }

  // 탭 전환 시 선택된 카테고리 초기화
  useEffect(() => {
    setSelectedCategoryId(null)
  }, [tab])

  // 파일 선택
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // 이미지 파일이 아닐 경우
      if (!file.type.startsWith('image/')) {
        e.target.value = ''
        setSelectedFile(null) // 선택한 파일 비우기
        setImageUrl(null) // 미리보기 지우기

        showSnackbar({
          text: '이미지 파일만 업로드할 수 있습니다.',
          type: 'error'
        })
        return
      }

      // 정상적인 이미지 파일
      setSelectedFile(file)
      setImageUrl(URL.createObjectURL(file))
    }
    e.target.value = '' // 같은 파일 다시 선택 가능하게 초기화
  }

  return (
    <>
      {/* 상단 탭 */}
      <div className="mb-3">
        <BinaryTabs
          value={tab}
          onChange={setTab}
          options={['수입', '지출']}
        />
      </div>
      <div className="p-4">
        {/* 날짜 */}
        <div className="mb-3 flex justify-start">
          <span className="text-neutral-dark font-bold">
            <PickDate isSliding={false} />
          </span>
        </div>

        {/* 폼 */}
        <form className="space-y-3">
          {/* 금액 */}
          <div>
            <AmountInput
              value={amount}
              onChange={setAmount}
              onButtonClick={() => setIsRepeatInstallmentModalOpen(true)}
              tab={tab}
              activeOption={activeOption}
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
          {tab === '지출' && (
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
              value={selectedFile ? selectedFile.name : null}
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
                <img
                  src={cameraIcon}
                  alt=""
                  className="mb-1"
                />
                <p>사진 미리보기</p>
              </div>
            )}
          </div>

          {/* 메모 */}
          <div className="flex flex-col gap-2">
            <span className="text-base text-neutral-dark font-bold">메모</span>
            <textarea
              ref={memoRef}
              name="memo"
              id="memo"
              placeholder="메모를 입력해 주세요"
              className="px-2.5 py-2 border-2 border-neutral-light rounded-lg focus:outline-none focus:border-primary-light placeholder:text-neutral-dark resize-none"
              rows={4}></textarea>
          </div>

          {/* 안내 문구 */}
          <GuideMessage
            amount={amount}
            type={tab}
            selectedCategoryId={selectedCategoryId}
            selectedMethodId={selectedMethodId}
          />

          <SubmitButton
            text={isSubmitting ? "저장 중..." : "작성 완료"}
            onClick={handleSubmit}
            disabled={
              isSubmitting ||
              !amount ||
              !selectedCategoryId ||
              (tab === '지출' && !selectedMethodId) ||
              Number(amount) < 100 ||
              Number(amount) > 99999999
            }
          />
        </form>
      </div>

      {/* 결제수단 모달 */}
      <PaymentModal
        open={isPaymentModalOpen}
        methods={methods}
        onClose={() => setIsPaymentModalOpen(false)}
        onSelect={id => {
          setSelectedMethodId(id) // 선택한 결제 수단 uuid 저장
          setIsPaymentModalOpen(false)
        }}
      />

      {/* 카테고리 모달 */}
      <CategoryModal
        open={isCategoryModalOpen}
        categories={categories}
        filterType={filterType}
        onClose={() => setIsCategoryModalOpen(false)}
        onSelect={id => {
          setSelectedCategoryId(id) // 선택한 카테고리 uuid 저장
          setIsCategoryModalOpen(false)
        }}
      />

      {/* 수입 - 반복 모달 */}
      {tab === '수입' && (
        <IncomeModal
          open={isRepeatInstallmentModalOpen}
          onClose={() => setIsRepeatInstallmentModalOpen(false)}
          onSave={data => {
            setIncomeRepeatData(data)
            setIsRepeatInstallmentModalOpen(false)
          }}
          initialData={incomeRepeatData}
        />
      )}

      {/* 지출 - 반복|할부 모달 */}
      {tab === '지출' && (
        <ExpenseModal
          open={isRepeatInstallmentModalOpen}
          onClose={() => setIsRepeatInstallmentModalOpen(false)}
          onSave={data => {
            setExpenseRepeatInstallmentData(data)
            setIsRepeatInstallmentModalOpen(false)
          }}
          initialData={expenseRepeatInstallmentData}
        />
      )}
    </>
  )
}
export default AddItem