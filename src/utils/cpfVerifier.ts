export const getCPFVerifier = (cpfStart: string) => {
  const partial = cpfStart.split('').map(c => Number(c))
  const remainder =
    partial
      .map((value, index) => (partial.length + 1 - index) * value)
      .reduce((accumulator, value) => accumulator + value, 0) % 11

  return remainder < 2 ? 0 : 11 - remainder
}
