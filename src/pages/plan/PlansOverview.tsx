import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import dayjs from 'dayjs'
import Loading from '@/shared/components/loading/Loading'
import { fetchAllItems } from '@/features/accountItem/service/accountItem'
import type { AccountItem } from '@/features/accountItem/model/types'
import { formatPriceNumber } from '@/shared/utils/format'
import { useRemaining } from './useRemaining'

import ConfirmModal from '@/shared/components/modal/ConfirmModal'
import deleteIcon from '@/shared/assets/icons/delete.svg'
import { deletePlanByItem } from '@/features/accountItem/service/accountItem'
import { useSnackbarStore } from '@/shared/stores/useSnackbarStore'

type Row = {
  id: string | number
  title: string
  amount: number
  type: 'income' | 'expense'
  nextDate: string | null
  remain: number
  kind: 'installment' | 'recurring'
  ruleId: string | null
}

export const PlansOverview = () => {
  const { groupId } = useParams()
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<Row[]>([])
  const { nextInstallment, nextRecurring } = useRemaining()
  const { showSnackbar } = useSnackbarStore()

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [target, setTarget] = useState<Row | null>(null)

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
              kind: 'installment',
              ruleId: a.installment_plan_id as string
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
              kind: 'recurring',
              ruleId: a.recurring_rule_id as string
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
  }, [])

  console.log(target)

  if (loading) return <Loading text="불러오는 중..." />

  return (
    <div className="px-5 py-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-size-xl font-bold">할부/반복 일정</h1>
      </div>

      <section>
        <h2 className="text-size-lg font-semibold mb-3">다가오는 일정</h2>
        <ul className="space-y-3">
          {rows.map(r => (
            <li
              key={`$${r.id}`}
              className="relative flex items-center justify-between rounded-lg border p-3 bg-white shadow-sm">
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
                  다음 결제일: <b>{r.nextDate}</b> <br /> 남은 횟수:
                  <b>{r.remain}</b>
                </p>
              </div>
              <div className="text-right shrink-0 flex items-center gap-2">
                <p className="font-bold">{formatPriceNumber(r.amount)}원</p>
                <button
                  type="button"
                  aria-label="삭제"
                  onClick={() => {
                    setTarget(r)
                    setConfirmOpen(true)
                  }}
                  className="absolute right-0 top-0 ml-1 inline-flex items-center justify-center w-8 h-8 rounded-md">
                  <img
                    src={deleteIcon}
                    alt=""
                    className="w-4 h-4"
                  />
                </button>
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

      <ConfirmModal
        open={confirmOpen}
        title="정말 삭제할까요?"
        lines={[
          target?.kind === 'installment'
            ? '할부 계획이 삭제됩니다.'
            : '반복 계획이 삭제됩니다.',
          '이 작업은 되돌릴 수 없어요.'
        ]}
        confirmText="삭제"
        cancelText="취소"
        onCancel={() => {
          setConfirmOpen(false)
          setTarget(null)
        }}
        onConfirm={async () => {
          if (!target) return
          try {
            await deletePlanByItem(
              String(target.ruleId),
              target.kind === 'installment' ? 'installment' : 'recurring'
            )
            setRows(prev => prev.filter(p => p.id !== target.id))
            showSnackbar({ text: '삭제됐어요', type: 'success' })
          } catch {
            showSnackbar({ text: '삭제 중 오류가 발생했어요', type: 'error' })
          } finally {
            setConfirmOpen(false)
            setTarget(null)
          }
        }}
      />
    </div>
  )
}
