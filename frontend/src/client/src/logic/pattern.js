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
  let normalizedPath = Path.move(scaledPath, { x: -1 * dims.min.x, y: 0 })
  return {
    letter: pattern.letter,
    boundary: normalizedBoundary,
    path: normalizedPath
  }
}

export function concatenate (patterns) {
  const SPACING = 15
  let normalizedPatterns = patterns.map((p) => {
    return normalize(p)
  })
  let concatenatedPath = []
  let expression = ''
  for (let i = 0; i < normalizedPatterns.length; i++) {
    let startX = Path.dimensions(concatenatedPath).max.x + SPACING || 0
    let translatedPath = Path.move(normalizedPatterns[i].path, { x: startX, y: 0 })
    concatenatedPath = concatenatedPath.concat(translatedPath)
    expression += normalizedPatterns[i].letter
  }

  return {
    letter: expression,
    boundary: normalizedPatterns[0].boundary,
    path: concatenatedPath
  }
}
