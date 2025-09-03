export function getCreateFormatDate(created_at: string): string {
  const date = new Date(created_at)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}`
}

// 댓글 최신순으로 정렬
export function sortByCreatedAtDesc<T extends { created_at: string }>(
  data: T[]
) {
  return [...data].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )
}
