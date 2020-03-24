import * as Vector from './vector'

export function size (path) {
  let mins = path.reduce((min, p) => {
    return { x: Math.min(min.x, p.x), y: Math.min(min.y, p.y) }
  })

  let maxs = path.reduce((max, p) => {
    return { x: Math.max(max.x, p.x), y: Math.max(max.y, p.y) }
  })

  return Math.max([maxs.x - mins.x, maxs.y - mins.y])
}

export function simplify (path) {
  return path
}

export function smooth (path) {
  return path
}

export function length (path) {
  let size = path.length
  return path.map((p, i, path) => {
    if (i > size - 2) {
      return 0
    }
    let difference = Vector.substract(path[i + 1], p)
    return Vector.magnitude(difference)
  }).reduce((sum, dist) => sum + dist)
}

export function move (path, v) {
  return path.map((p) => {
    return { x: p.x + v.x, y: p.y + v.y }
  })
}

export function scale (path, scale) {
  return path.map((p) => {
    return { x: p.x * scale, y: p.y * scale }
  })
}

export function flipX (path) {
  return path.map((p) => {
    return { x: -1 * p.x, y: p.y }
  })
}

export function flipY (path) {
  return path.map((p) => {
    return { x: p.x, y: -1 * p.y }
  })
}
