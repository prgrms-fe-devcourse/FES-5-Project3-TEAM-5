import type { TablesUpdate } from '@/supabase/database.types'
import supabase from '@/supabase/supabase'

type UpdateItemParams = {
  id: string
  amount: number
  categoryId: string | null
  paymentMethodId: string | null
  memo: string | null
  file: File | null
  userId: string
  prevReceiptUrl: string | null
}


// 가계부 아이템 업데이트
export async function updateAccountItem({
  id,
  amount,
  categoryId,
  paymentMethodId,
  memo,
  file,
  userId,
  prevReceiptUrl
}: UpdateItemParams) {
  let receiptUrl: string | null = prevReceiptUrl


  // 1. 파일 업로드
  if (file) {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('receipts')
      .upload(`${userId}/${Date.now()}_${file.name}`, file)

    if (uploadError) throw uploadError

    const { data: publicUrl } = supabase.storage
      .from('receipts')
      .getPublicUrl(uploadData.path)

    receiptUrl = publicUrl.publicUrl
  }

  // 2. DB 업데이트 payload
  const updatePayload: TablesUpdate<"account_items"> = {
    amount,
    category_id: categoryId,
    memo,
    receipt_url: receiptUrl,
  }

  // 지출일 때 결제 수단 포함
  if (paymentMethodId !== null) {
    updatePayload.payment_method_id = paymentMethodId
  }

  // 3. 최종 account_items update
  const { data, error } = await supabase
    .from("account_items")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .single()

  if(error) throw error
  return data
}
