import type { TablesInsert } from "@/supabase/database.types"
import supabase from "@/supabase/supabase"

export type RepeatInstallmentData = {
  mode: "반복" | "할부"
  selectedPeriod?: string
  isBiMonthly?: boolean
  endDate?: Date | null
  installment?: string | null
}

type SaveItemParams = {
  amount: number
  type: "income" | "expense"
  date: string // YYYY-MM-DD
  userId: string
  groupId: string
  categoryId: string | null
  paymentMethodId: string | null
  memo: string | null
  file: File | null
  repeatInstallmentData?: RepeatInstallmentData
}


// selectedPeriod를 Supabase Enum(RecurringType)에 맞게 변환
function mapPeriodToFrequency(
  period: string
): TablesInsert<"recurring_rules">["frequency"] {
  switch (period) {
    case "매일": return "daily"
    case "격일": return "twoDays"
    case "매주": return "weekly"
    case "격주": return "twoWeeks"
    case "매월": return "monthly"
    case "격월": return "twoMonths"
    case "매년": return "yearly"
    case "격년": return "twoYears"
    default: return "monthly"
  }
}


// 가계부 아이템 저장 (파일 업로드 + 반복/할부 insert)
export async function saveAccountItem({
  amount,
  type,
  date,
  userId,
  groupId,
  categoryId,
  paymentMethodId,
  memo,
  file,
  repeatInstallmentData,
}: SaveItemParams) {
  let receiptUrl: string | null = null

  // 1. 파일 업로드
  if (file) {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("receipts")
      .upload(`${userId}/${Date.now()}_${file.name}`, file)

    if (uploadError) throw uploadError

    const { data: publicUrl } = supabase.storage
      .from("receipts")
      .getPublicUrl(uploadData.path)

    receiptUrl = publicUrl.publicUrl
  }

  // 2. 반복/할부 데이터 저장
  let installmentPlanId: string | null = null
  let recurringRuleId: string | null = null

  if (repeatInstallmentData?.mode === "할부") {
    const { data, error } = await supabase
      .from("installment_plans")
      .insert({
        total_amount: amount,
        months: Number(repeatInstallmentData.installment),
        start_date: date,
        end_date: repeatInstallmentData.endDate
          ? repeatInstallmentData.endDate.toISOString()
          : null,
      })
      .select("id")
      .single()

    if (error) throw error
    installmentPlanId = data.id
  }

  if (repeatInstallmentData?.mode === "반복") {
    const { data, error } = await supabase
      .from("recurring_rules")
      .insert({
        frequency: mapPeriodToFrequency(repeatInstallmentData.selectedPeriod as string), // RepeatInstallmentModal 모달에서 기본 값이 매일이어서 단언
        end_date: repeatInstallmentData.endDate
          ? repeatInstallmentData.endDate.toISOString()
          : null,
      })
      .select("id")
      .single()

    if (error) throw error
    recurringRuleId = data.id
  }

  // 3. 최종 account_items insert
  const { data, error } = await supabase
    .from("account_items")
    .insert({
      amount,
      type,
      date,
      user_id: userId,
      group_id: groupId,
      category_id: categoryId ?? null,
      payment_method_id: paymentMethodId ?? null,
      memo: memo ?? null,
      receipt_url: receiptUrl ?? null,
      installment_plan_id: installmentPlanId ?? null,
      recurring_rule_id: recurringRuleId ?? null,
    } satisfies TablesInsert<"account_items">)
    .select()
    .single()

  if (error) throw error
  return data
}
