function dist (a, b) {
  let distX = b.x - a.x
  let distY = b.y - a.y
  return Math.abs(Math.pow((distX * distX) + (distY * distY), 0.5))
}

export function compare (pathA, pathB) {
  let totalA = 0
  for (let i = 0; i < pathA.length - 1; i++) {
    totalA += dist(pathA[i], pathA[i + 1])
  }
  let totalB = 0
  for (let i = 0; i < pathB.length - 1; i++) {
    totalB += dist(pathB[i], pathB[i + 1])
  }
  if (((totalA - totalB) / totalA) < 0.1) {
    return true
  }
  return false
}
