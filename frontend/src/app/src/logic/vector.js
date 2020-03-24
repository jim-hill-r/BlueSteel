export function magnitude (v) {
  return Math.pow(magnitudeSq(v), 0.5)
}

export function magnitudeSq (v) {
  return (v.x * v.x) + (v.y * v.y)
}

export function normalize (v) {
  let m = magnitude(v)
  return { x: v.x / m, y: v.y / m }
}

export function add (a, b) {
  return { x: a.x + b.x, y: a.y + b.y }
}

export function substract (a, b) {
  return { x: a.x - b.x, y: a.y - b.y }
}

export function dot (a, b) {
  return (a.x * b.x) + (a.y * b.y)
}

export function cross (a, b) {
  return (a.x * b.y) - (a.y * b.x)
}

export function angle (a, b) {
  return Math.acos(dot(a, b) / (magnitude(a) * magnitude(b)))
}
