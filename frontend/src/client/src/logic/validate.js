import * as path from './path.js'
import * as vector from './vector.js'

export function compare (a, b) {
  return comparePathLength(a, b) &&
    comparePoints(a, b, 'start') &&
    comparePoints(a, b, 'end')
}

function comparePathLength (a, b) {
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

function comparePoints (a, b, typeFilter) {
  let filteredA = a.filter(point => point.type === typeFilter)
  let filteredB = b.filter(point => point.type === typeFilter)

  let size = path.size(a)
  for (let i = 0; i < filteredA.length; i++) {
    let minDist = size
    for (let j = 0; j < filteredB.length; j++) {
      let lineAB = vector.substract(filteredA[i], filteredB[j])
      let dist = vector.magnitude(lineAB)
      minDist = Math.min(minDist, dist)
    }
    let error = minDist / size
    if (error > 0.1) {
      return false
    }
  }
  return true
}
