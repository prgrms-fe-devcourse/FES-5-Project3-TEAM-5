export function formatDate(date: string) {
  const newDate = new Date(date)
  const month = newDate.getMonth() + 1
  const day = newDate.getDate()

  const days = ['일', '월', '화', '수', '목', '금', '토']
  const dayOfWeek = days[newDate.getDay()]

  return `${month}월 ${day}일 ${dayOfWeek}`
}

export function getDeadline(end: string) {
  const now = new Date()
  const endDate = new Date(end)

  const diffMs = endDate.getTime() - now.getTime()

  if (diffMs <= 0) return '종료됨'

  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const hours = Math.floor(diffMin / 60)
  const minutes = diffMin % 60

  return `${hours}시간 ${minutes}분`
}
