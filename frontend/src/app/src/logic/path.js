import * as vector from './vector'

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
    let difference = vector.substract(path[i + 1], p)
    return vector.magnitude(difference)
  }).reduce((sum, dist) => sum + dist)
}

export function scale (path) {
  return path
}

export function flipX (path) {
  return path
}

export function flipY (path) {
  return path
}

export function rotate (path, angle) {
  return path
}
