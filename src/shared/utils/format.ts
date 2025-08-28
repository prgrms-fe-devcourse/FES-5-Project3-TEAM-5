const formatPriceNumber = (number: number) => {
  const sign = number > 0 ? '' : '-'
  const absNum = Math.abs(number)

  const formatted = [...absNum.toString()]
    .reverse()
    .reduce((acc: string[], char, index) => {
      if (index % 3 === 0 && index !== 0) {
        acc.push(',')
      }
      acc.push(char)
      return acc
    }, [] as string[])
    .reverse()
    .join('')
  return sign + formatted
}

const formatPriceInput = (raw: string, maxDigits: number = 8) => {
  const digits = raw.replace(/\D/g, '')
  const trimmed = digits.replace(/^0+(?=\d)/, '')
  return trimmed.slice(0, maxDigits)
}

export { formatPriceNumber, formatPriceInput }
