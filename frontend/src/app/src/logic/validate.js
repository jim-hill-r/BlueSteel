import * as path from './path.js'

export function compare (a, b) {
  let lengthA = path.length(a)
  let lengthB = path.length(b)
  let error = Math.abs(lengthA - lengthB) / lengthA
  if (error < 0.5) {
    return true
  }
  return false
}
