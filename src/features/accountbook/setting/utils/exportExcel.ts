import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import type { AccountItem } from '@/features/accountItem'
import dayjs from 'dayjs'
import { frequencyMap } from '../model/exportExcel'

export function getDateRange(
  year: number,
  month: number
): { startDate: string; endDate: string } {
  // 시작일 (해당 월의 첫째 날)
  const start = dayjs(`${year}-${month}-01`).startOf('month')
  // 마지막일 (해당 월의 마지막 날)
  const end = start.endOf('month')

  return {
    startDate: start.format('YYYY-MM-DD'),
    endDate: end.format('YYYY-MM-DD')
  }
}

function getMappingData(data: AccountItem[]) {
  if (!data || data.length === 0) {
    alert('데이터가 없습니다.')
    return []
  }

  return data.map(item => {
    const isExpense = item.type === 'expense'
    const frequency = item.recurring_rules?.frequency
    return {
      날짜: new Date(item.date).toLocaleDateString(),
      금액: Number(item.amount),
      타입: isExpense ? '지출' : '수입',
      카테고리: item.categories?.korean_name ?? '',
      결제수단: isExpense ? (item.payment_methods?.type ?? '') : 'X',
      반복주기: isExpense
        ? frequency
          ? (frequencyMap[frequency] ?? 'X')
          : 'X'
        : 'X',
      할부주기: isExpense ? (item.installment_plans?.months ?? 'X') : 'X',
      메모: item.memo ?? ''
    }
  })
}
export function downloadExcel(
  data: AccountItem[],
  fileNamePrefix: string = 'account_items',
  serverUrlFallback: string = ''
) {
  const mappedData = getMappingData(data)
  if (mappedData.length === 0) return

  const worksheet = XLSX.utils.json_to_sheet(mappedData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  workbook.Props = {
    Title: '또모 가계부',
    Author: 'ttomo account book',
    CreatedDate: new Date()
  }

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  })

  const fileName = `${fileNamePrefix}_${new Date().toISOString().slice(0, 10)}.xlsx`

  // 안전한 UA 체크
  const ua = navigator.userAgent || ''
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as any)?.MSStream
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isWebView = /(wv|WebView)/i.test(ua) || /KAKAOTALK|NAVER/i.test(ua)

  if (isIOS && navigator.share) {
    // iOS WebView: 공유 UI
    const file = new File([blob], fileName, { type: blob.type })
    navigator.share({
      files: [file],
      title: fileName,
      text: '엑셀 파일을 확인하세요.'
    })
  } else if (!isWebView) {
    // 일반 웹 브라우저
    saveAs(blob, fileName)
  } else {
    // 앱 WebView fallback
    if (serverUrlFallback) {
      window.location.href = serverUrlFallback
    } else {
      alert(
        '앱 WebView에서는 직접 다운로드가 지원되지 않습니다. 서버 URL을 제공해주세요.'
      )
    }
  }
}
