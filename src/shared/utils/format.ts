const formatPriceNumber = (number: number) => {
  return [...number.toString()].reduce((acc: string[], char, index) => {
    if (index % 3 === 0 && index !== 0) {
      acc.push(',')
    }
    acc.push(char)
    return acc
  }, [] as string[])
}

export { formatPriceNumber }
