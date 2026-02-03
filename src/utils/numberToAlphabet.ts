const chars = '0123456789abcdefghijklmnopqrstuvwxyz-'
const l = chars.length

export const numberToAlphabet = (x: number) => {
  let result = ''
  while (x > 0) {
    result = chars[x % l] + result
    x = Math.floor(x / l)
  }
  return result
}

export const alphabetToNumber = (s: string) => {
  let result = 0
  for (const c of s) {
    result = result * l + chars.indexOf(c)
  }
  return result
}
