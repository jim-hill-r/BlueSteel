import * as Path from './path'

export function normalize (pattern) {
  const normalizedCapHeight = 100
  let patternCapHeight = pattern.boundary.baseLine - pattern.boundary.capLine
  let scaleFactor = normalizedCapHeight / patternCapHeight

  let normalizedBoundary = {
    top: pattern.boundary.top * scaleFactor,
    ascenderLine: pattern.boundary.ascenderLine * scaleFactor,
    capLine: pattern.boundary.capLine * scaleFactor,
    meanLine: pattern.boundary.meanLine * scaleFactor,
    baseLine: pattern.boundary.baseLine * scaleFactor,
    beardLine: pattern.boundary.beardLine * scaleFactor,
    bottom: pattern.boundary.bottom * scaleFactor
  }
  let scaledPath = Path.scale(pattern.path, scaleFactor)
  let dims = Path.dimensions(scaledPath)
  let normalizedPath = Path.move(scaledPath, { x: -1 * dims.min.x })
  return {
    letter: pattern.letter,
    boundary: normalizedBoundary,
    path: normalizedPath
  }
}
