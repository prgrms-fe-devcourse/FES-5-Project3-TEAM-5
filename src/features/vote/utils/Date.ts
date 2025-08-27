export function formatDate(date: string) {
  const newDate = new Date(date)
  const month = newDate.getMonth() + 1
  const day = newDate.getDate()

  const days = ['일', '월', '화', '수', '목', '금', '토']
  const dayOfWeek = days[newDate.getDay()]

  return `${month}월 ${day}일 ${dayOfWeek}`
}

export function getDeadline(ends_at: string) {
  const end = new Date(ends_at).getTime()
  const now = Date.now()
  const diff = end - now

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  return {
    text: `${hours}시간 ${minutes}분`,
    value: hours * 60 + minutes
  }
}
