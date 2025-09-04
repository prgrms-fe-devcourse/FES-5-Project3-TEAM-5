import supabase from '@/supabase/supabase'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

type ItemType = '수입' | '지출'

function useEditItem(id: string) {
  const [amount, setAmount] = useState<string>('')
  const [itemType, setItemType] = useState<ItemType>('지출')
  const [date, setDate] = useState<string | null>(null)
  const [memo, setMemo] = useState<string>('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  )
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null)
  const [hasInstallment, setHasInstallment] = useState(false)
  const [hasRecurring, setHasRecurring] = useState(false)

  const navigate = useNavigate()

  // 아이템 데이터 패칭
  useEffect(() => {
    ;(async () => {
      try {
        const { data, error } = await supabase
          .from('account_items')
          .select(
            `
            id, amount, type, date, memo, receipt_url, category_id, payment_method_id, installment_plan_id, recurring_rule_id`
          )
          .eq('id', id)
          .single()

        if (error || !data) {
          throw new Error('아이템 불러오기 실패')
        }

        // 받아온 데이터 state에 채우기
        setAmount(data.amount.toString())
        setItemType(data.type === 'income' ? '수입' : '지출')
        setDate(data.date)
        setMemo(data.memo ?? '')
        setImageUrl(data.receipt_url ?? null)
        setSelectedCategoryId(data.category_id)
        setSelectedMethodId(data.payment_method_id)

        // 뱃지
        setHasInstallment(!!data.installment_plan_id)
        setHasRecurring(!!data.recurring_rule_id)
      } catch (error) {
        console.error('아이템 불러오기 실패', error)
        navigate('/404', { replace: true })
      }
    })()
  }, [id, navigate])

  return {
    amount, setAmount,
    itemType,
    date,
    memo, setMemo,
    imageUrl, setImageUrl,
    selectedCategoryId, setSelectedCategoryId,
    selectedMethodId, setSelectedMethodId,
    hasInstallment,
    hasRecurring
  }
}
export default useEditItem
