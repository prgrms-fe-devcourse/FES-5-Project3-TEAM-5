const formatPriceNumber = (number: number) => {
  return [...number.toString()]
    .reverse()
    .reduce((acc: string[], char, index) => {
      if (
        index % 3 === 0 &&
        index !== 0 &&
        index !== number.toString().length - 1
      ) {
        acc.push(',')
      }
      acc.push(char)
      return acc
    }, [] as string[])
    .reverse()
    .join('')
}

const formatPriceInput = (raw: string, maxDigits: number = 8) => {
  const digits = raw.replace(/\D/g, '')
  const trimmed = digits.replace(/^0+(?=\d)/, '')
  return trimmed.slice(0, maxDigits)
}

export { formatPriceNumber, formatPriceInput }
