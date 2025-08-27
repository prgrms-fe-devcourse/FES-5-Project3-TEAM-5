import { useRef, useState } from 'react'
import BinaryTabs from './components/BinaryTabs'
import SubmitButton from '@/shared/components/form/SubmitButton'
import AmountInput from './components/AmountInput'
import SelectField from './components/SelectField'

function AddItem() {
  const [tab, setTab] = useState<'수입' | '지출'>('수입') // 탭 상태
  const [amount, setAmount] = useState('') // 금액
  const [memo, setMemo] = useState('') // 메모 내용

  const [selectedFile, setSelectedFile] = useState<File | null>(null) // 업로드한 사진 객체
  const [imageUrl, setImageUrl] = useState<string | null>(null) // 미리보기 사진 url
  const fileInputRef = useRef<HTMLInputElement>(null) // hidden 처리된 file input 클릭하기 위한 ref

  const [activeOption, setActiveOption] = useState<
    'none' | 'repeat' | 'installment'
  >('none')

  const handleButtonClick = () => {
    // 테스트용 -> 나중에 모달 띄우게 수정
    // eslint-disable-next-line no-console
    console.log('버튼이 눌렸습니다.')
    setActiveOption('repeat')
  }

  const test = () => {
    alert('test')
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 파일 선택
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setImageUrl(URL.createObjectURL(file))
    } else {
      setSelectedFile(null)
      setImageUrl(null)
    }
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

      {/* 날짜 */}
      <div className="mb-3">
        <span className="text-neutral-dark font-bold">11월 22일 토</span>
      </div>

      {/* 폼 */}
      <form className="space-y-3">
        {/* 금액 */}
        <div>
          <AmountInput
            value={amount}
            onChange={setAmount}
            onButtonClick={handleButtonClick}
            activeOption={activeOption}
          />
        </div>

        {/* 분류 */}
        <div>
          <SelectField
            label="분류"
            value={''}
            placeholder="분류를 선택해 주세요"
            onClick={test}
          />
        </div>

        {/* 수단 */}
        {tab === '지출' && (
          <div>
            <SelectField
              label="수단"
              value={''}
              placeholder="결제수단을 선택해 주세요"
              onClick={test}
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
            rows={4}></textarea>
        </div>

        <SubmitButton text="작성 완료" />
      </form>
    </>
  )
}
export default AddItem
