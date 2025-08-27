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

export { formatPriceNumber }
