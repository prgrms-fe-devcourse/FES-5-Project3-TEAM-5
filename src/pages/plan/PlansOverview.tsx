import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import dayjs from 'dayjs'
import Loading from '@/shared/components/loading/Loading'
import { fetchAllItems } from '@/features/accountItem/service/accountItem'
import type { AccountItem } from '@/features/accountItem/model/types'
import { formatPriceNumber } from '@/shared/utils/format'
import { useRemaining } from './useRemaining'

type Row = {
  id: string | number
  title: string
  amount: number
  type: 'income' | 'expense'
  nextDate: string | null
  remain: number
  kind: 'installment' | 'recurring'
}

export const PlansOverview = () => {
  const { groupId } = useParams()
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<Row[]>([])
  const { nextInstallment, nextRecurring } = useRemaining()

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        if (!groupId) return
        const all = (await fetchAllItems(groupId)) as AccountItem[]
        const src = all.filter(
          a =>
            (!a.installment_parent_id && a.installment_plans) ||
            (!a.recurring_parent_id && a.recurring_rules)
        )

        const mapped: Row[] = src.map(a => {
          const title =
            a.memo ??
            a.categories?.korean_name ??
            a.categories?.name ??
            '이름없음'
          if (a.installment_plans) {
            const { next, remain } = nextInstallment(a)
            return {
              id: a.id,
              title,
              amount: Number(a.amount) || 0,
              type: a.type,
              nextDate: next,
              remain,
              kind: 'installment'
            }
          } else {
            const { next, remain } = nextRecurring(a)
            return {
              id: a.id,
              title,
              amount: Number(a.amount) || 0,
              type: a.type,
              nextDate: next,
              remain,
              kind: 'recurring'
            }
          }
        })

        const result = mapped
          .filter(r => r.nextDate) // 종료된 건 제외
          .sort(
            (a, b) =>
              dayjs(a.nextDate!).valueOf() - dayjs(b.nextDate!).valueOf()
          )

        if (mounted) setRows(result)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [groupId])

  if (loading) return <Loading text="불러오는 중..." />

  return (
    <div className="px-5 py-4 space-y-6">
      <h1 className="text-size-xl font-bold">할부/반복 일정</h1>

      <section>
        <h2 className="text-size-lg font-semibold mb-3">다가오는 일정</h2>
        <ul className="space-y-3">
          {rows.map(r => (
            <li
              key={`$${r.id}`}
              className="flex items-center justify-between rounded-lg border p-3 bg-white shadow-sm">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-[2px] text-[11px] rounded-full ${
                      r.kind === 'installment'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}>
                    {r.kind === 'installment' ? '할부' : '반복'}
                  </span>
                  <span className="text-[11px] px-2 py-[2px] rounded-full bg-neutral-100 text-neutral-700">
                    {r.type === 'income' ? '수입' : '지출'}
                  </span>
                </div>
                <p className="mt-1 font-semibold truncate">{r.title}</p>
                <p className="text-neutral-600 text-[13px]">
                  다음 결제일: <b>{r.nextDate}</b> · 남은 횟수:
                  <b>{r.remain}</b>
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold">{formatPriceNumber(r.amount)}원</p>
              </div>
            </li>
          ))}
          {rows.length === 0 && (
            <li className="text-center text-neutral-500 py-12 border rounded-lg bg-white">
              예정된 할부/반복 일정이 없어요.
            </li>
          )}
        </ul>
      </section>
    </div>
  )
}
