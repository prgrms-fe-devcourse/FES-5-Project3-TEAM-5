import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import type { AccountItem } from '@/features/accountItem'
import dayjs from 'dayjs'
import { frequencyMap } from '../model/exportExcel'
import type { SnackbarType } from '@/shared/stores/useSnackbarStore'

interface ExcelOptions {
  showSnackbar: (payload: { text: string; type: SnackbarType }) => void
  fileNamePrefix?: string
  serverUrlFallback?: string
}

export function getDateRange(
  year: number,
  month: number
): { startDate: string; endDate: string } {
  const start = dayjs(`${year}-${month}-01`).startOf('month')
  const end = start.endOf('month')
  return {
    startDate: start.format('YYYY-MM-DD'),
    endDate: end.format('YYYY-MM-DD')
  }
}

function getMappingData(
  data: AccountItem[],
  showSnackbar: ExcelOptions['showSnackbar']
) {
  if (!data || data.length === 0) {
    showSnackbar({ text: '데이터가 없습니다', type: 'error' })
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
  {
    showSnackbar,
    fileNamePrefix = 'TTOMO',
    serverUrlFallback = ''
  }: ExcelOptions
) {
  const mappedData = getMappingData(data, showSnackbar)
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

  const ua = navigator.userAgent || ''
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as any)?.MSStream
  const isWebView = /(wv|WebView)/i.test(ua) || /KAKAOTALK|NAVER/i.test(ua)

  if (isIOS && navigator.share) {
    const file = new File([blob], fileName, { type: blob.type })
    navigator.share({
      files: [file],
      title: fileName,
      text: '엑셀 파일을 확인하세요.'
    })
  } else if (!isWebView) {
    saveAs(blob, fileName)
    showSnackbar({ text: '파일이 다운로드 되었습니다', type: 'success' })
  } else {
    if (serverUrlFallback) {
      window.location.href = serverUrlFallback
    } else {
      showSnackbar({
        text: '앱 WebView에서는 직접 다운로드가 지원되지 않습니다',
        type: 'error'
      })
    }
  }
}
