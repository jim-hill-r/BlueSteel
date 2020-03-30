import * as path from './path.js'

export function compare (a, b) {
  if (a.length > b.length) {
    a = path.simplify(a, b.length)
  } else {
    b = path.simplify(b, a.length)
  }
  let lengthA = path.length(a)
  let lengthB = path.length(b)
  let error = Math.abs(lengthA - lengthB) / lengthA
  if (error < 0.125) {
    return true
  }
  return false
}
