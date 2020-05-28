import * as Path from './path.js'
import * as Vector from './vector.js'
import * as Pattern from './pattern.js'

export function compare (a, b) {
  let patternA = Pattern.normalize(a)
  let patternB = Pattern.normalize(b)
  return comparePathLength(patternA.path, patternB.path) &&
    comparePoints(patternA.path, patternB.path, 'start') &&
    comparePoints(patternA.path, patternB.path, 'end') &&
    compareDimensions(patternA.path, patternB.path)
}

function comparePathLength (a, b) {
  const countA = a.length || 0
  const countB = b.length || 0
  if (countA < 10 || countB < 10) {
    return false
  }
  if (countA > countB) {
    a = Path.simplify(a, countB)
  } else {
    b = Path.simplify(b, countA)
  }
  let lengthA = Path.length(a)
  let lengthB = Path.length(b)
  let error = Math.abs(lengthA - lengthB) / lengthA
  if (error > 0.125) {
    return false
  }
  return true
}

function comparePoints (a, b, typeFilter) {
  let filteredA = a.filter(point => point.type === typeFilter)
  let filteredB = b.filter(point => point.type === typeFilter)

  let dimA = Path.dimensions(a)
  let size = Math.max(dimA.w, dimA.h)

  for (let i = 0; i < filteredA.length; i++) {
    let minDist = size
    for (let j = 0; j < filteredB.length; j++) {
      let lineAB = Vector.substract(filteredA[i], filteredB[j])
      let dist = Vector.magnitude(lineAB)
      minDist = Math.min(minDist, dist)
    }
    let error = minDist / size
    if (error > 0.1) {
      return false
    }
  }
  return true
}

function compareDimensions (a, b) {
  let dimA = Path.dimensions(a)
  let dimB = Path.dimensions(b)
  let size = Math.max(dimA.w, dimA.h)

  let errorW = Math.abs(dimA.w - dimB.w) / size
  if (errorW > 0.125) {
    return false
  }

  let errorH = Math.abs(dimA.h - dimB.h) / size
  if (errorH > 0.125) {
    return false
  }

  let errorCx = Math.abs(dimA.c.x - dimB.c.x) / size
  if (errorCx > 0.1) {
    return false
  }

  let errorCy = Math.abs(dimA.c.y - dimB.c.y) / size
  if (errorCy > 0.1) {
    return false
  }

  return true
}
