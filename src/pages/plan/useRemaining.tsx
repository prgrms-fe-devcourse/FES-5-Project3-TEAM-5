import type { AccountItem } from '@/features/accountItem'
import dayjs from 'dayjs'

export const useRemaining = () => {
  const freqToStep = (freq?: string) => {
    switch (freq) {
      case 'daily':
        return { n: 1, u: 'day' as const }
      case 'weekly':
        return { n: 1, u: 'week' as const }
      case 'monthly':
        return { n: 1, u: 'month' as const }
      case 'yearly':
        return { n: 1, u: 'year' as const }
      case 'twoDays':
        return { n: 2, u: 'day' as const }
      case 'twoWeeks':
        return { n: 2, u: 'week' as const }
      case 'twoMonths':
        return { n: 2, u: 'month' as const }
      case 'twoYears':
        return { n: 2, u: 'year' as const }
      default:
        return null
    }
  }

  const nextInstallment = (item: AccountItem) => {
    const plan = item.installment_plans
    if (!plan) return { next: null as string | null, remain: 0 }
    const start = dayjs(plan.start_date).startOf('day')
    const end = dayjs(plan.end_date).endOf('day')
    const now = dayjs().startOf('day')

    if (now.isBefore(start)) {
      return { next: start.format('YYYY-MM-DD'), remain: plan.months }
    }

    // 경과 개월 수
    let passed = now.diff(start, 'month')
    // 같은 달이고 시작일이 아직 안 온 경우 passed 보정
    if (start.add(passed, 'month').isAfter(now)) passed -= 1
    const remain = Math.max(0, plan.months - (passed + 1))
    const candidate = start.add(passed + 1, 'month')
    const next = candidate.isAfter(end) ? null : candidate.format('YYYY-MM-DD')
    return { next, remain }
  }

  const nextRecurring = (item: AccountItem) => {
    const rule = item.recurring_rules
    if (!rule) return { next: null as string | null, remain: 0 }
    const step = freqToStep(rule.frequency)
    if (!step) return { next: null, remain: 0 }

    let cur = dayjs(item.date).startOf('day')
    const end = dayjs(rule.end_date).endOf('day')
    const now = dayjs().startOf('day')

    while (cur.isBefore(now)) {
      cur = cur.add(step.n, step.u)
      if (cur.isAfter(end)) return { next: null, remain: 0 }
    }
    // 남은 횟수 대략 계산
    let r = 0
    let tmp = cur
    while (!tmp.isAfter(end)) {
      r += 1
      tmp = tmp.add(step.n, step.u)
    }
    return { next: cur.format('YYYY-MM-DD'), remain: Math.max(0, r) }
  }

  const pastInstallment = (item: AccountItem) => {
    const plan = item.installment_plans
    if (!plan) return { next: null as string | null, remain: 0 }
    const start = dayjs(plan.start_date).startOf('day')
    const end = dayjs(plan.end_date).endOf('day')
    const now = dayjs().startOf('day')

    // 종료된 계획(이전 일정)만 반환
    if (now.isAfter(end)) {
      return { next: end.format('YYYY-MM-DD'), remain: 0 }
    }
    // 아직 시작 전이거나 진행 중이면 과거 목록에 표시하지 않음
    if (now.isBefore(start) || now.isSame(start) || now.isBefore(end)) {
      return { next: null, remain: 0 }
    }
    return { next: null, remain: 0 }
  }

  const pastRecurring = (item: AccountItem) => {
    const rule = item.recurring_rules
    if (!rule) return { next: null as string | null, remain: 0 }
    const step = freqToStep(rule.frequency)
    if (!step) return { next: null, remain: 0 }

    const start = dayjs(item.date).startOf('day')
    const end = dayjs(rule.end_date).endOf('day')
    const now = dayjs().startOf('day')

    // 종료된 반복만 과거 목록에
    if (now.isAfter(end)) {
      let cur = start
      let last = start
      while (!cur.isAfter(end)) {
        last = cur
        cur = cur.add(step.n, step.u)
      }
      return { next: last.format('YYYY-MM-DD'), remain: 0 }
    }
    return { next: null, remain: 0 }
  }

  return { nextInstallment, nextRecurring, pastInstallment, pastRecurring }
}
