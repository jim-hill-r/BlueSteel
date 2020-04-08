import * as path from './path.js'

export function compare (a, b) {
  const countA = a.length || 0
  const countB = b.length || 0
  if (countA < 10 || countB < 10) {
    return false
  }
  if (countA > countB) {
    a = path.simplify(a, countB)
  } else {
    b = path.simplify(b, countA)
  }
  let lengthA = path.length(a)
  let lengthB = path.length(b)
  let error = Math.abs(lengthA - lengthB) / lengthA
  if (error < 0.125) {
    return true
  }
  return false
}
