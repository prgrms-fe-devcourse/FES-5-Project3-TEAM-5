type Props = {
  amount: string
  type: '수입' | '지출'
  selectedCategoryId: string | null
  selectedMethodId: string | null
}

function GuideMessage({ amount, type, selectedCategoryId, selectedMethodId }:Props) {
  return (
    <p className="mt-4 text-sm text-secondary-red text-center">
      {!amount
        ? '금액을 입력해 주세요'
        : Number(amount) > 0 && Number(amount) < 100
        ? '금액은 100원 이상 1억 미만으로 입력해 주세요'
        : type === '수입' && Number(amount) >= 100 && !selectedCategoryId
        ? '분류를 선택해 주세요'
        : type === '지출' && Number(amount) >= 100
          ? !selectedCategoryId && !selectedMethodId
            ? '분류와 결제수단을 선택해 주세요'
            : !selectedCategoryId
            ? '분류를 선택해 주세요'
            : !selectedMethodId
            ? '결제수단을 선택해 주세요'
            : '\u00A0'
          : '\u00A0'}
    </p>
  )
}
export default GuideMessage