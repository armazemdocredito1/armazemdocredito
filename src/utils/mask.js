export default class Mask {
  constructor(pattern) {
    const regexMap = {
      0: /\d/,
    }

    const patterns = []
    if (typeof pattern === 'string') {
      patterns.push(pattern)
    }

    this.patterns = patterns.map((item) =>
      item.split('').map((char) => regexMap[char] || char)
    )
  }

  getSingleMasked(value, mask) {
    let result = ''
    let i = 0
    let j = 0

    while (i < value.length && j < mask.length) {
      if (typeof mask[j] === 'string' && mask[j] === value[i]) {
        // Literal match, walk value and pattern
        result += value[i]
        i++
        j++
        continue
      } else if (mask[j] instanceof RegExp) {
        if (mask[j].test(value[i])) {
          // Regex match, walk value and pattern
          result += value[i]
          i++
          j++
          continue
        } else {
          // Unmatched (required) pattern, walk value
          i++
          continue
        }
      } else {
        // Pattern is a literal symbol different than value.
        // Look for the next regex and if there's a match,
        // append symbols in the middle to result.
        let optimisticResult = String(result)
        let k
        for (k = j; k < mask.length; k++) {
          if (mask[k] instanceof RegExp) {
            break
          }
          // mask[k] is a literal symbol
          optimisticResult += mask[k]
        }

        if (k !== mask.length && mask[k].test(value[i])) {
          result = optimisticResult + value[i]
          j = k + 1
          i++
          continue
        }

        // No match, skip value
        i++
      }
    }

    return result
  }

  getMasked(value) {
    let longestMasked = ''
    for (const pattern of this.patterns) {
      const masked = this.getSingleMasked(value, pattern)
      if (pattern.length === masked.length) {
        return masked
      }

      if (pattern.length > longestMasked.length) {
        longestMasked = masked
      }
    }

    return longestMasked
  }
}
