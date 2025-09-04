import { useEffect, useState } from "react"
import type { Category, PaymentMethod } from "../types"
import supabase from "@/supabase/supabase"

function useModalOptions() {
  const [methods, setMethods] = useState<PaymentMethod[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(()=> {
    (async () => {
      const [methodRes, categoryRes] = await Promise.all([
        supabase.from("payment_methods").select("id, type, index").order("index"),
        supabase.from("categories").select("id, name, korean_name, type, index").order("index"),
      ])

      if (methodRes.error) console.error("결제수단 불러오기 실패:", methodRes.error)
      else setMethods((methodRes.data as PaymentMethod[]) ?? [])

      if (categoryRes.error) console.error("카테고리 불러오기 실패:", categoryRes.error)
      else setCategories((categoryRes.data as Category[]) ?? [])
    })()
  },[])

  return { methods, categories}
}
export default useModalOptions