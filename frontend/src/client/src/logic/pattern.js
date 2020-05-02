import * as Path from './path'

export function normalize (pattern) {
  if (!pattern.path || pattern.path.length < 1) {
    return []
  }
  let patternHeight = pattern.dimensions.lowerGuidePixels - pattern.dimensions.upperGuidePixels
  let normalizedHeight = 100
  let scaledPath = Path.scale(pattern.path, normalizedHeight / patternHeight)
  let dims = Path.dimensions(scaledPath)
  scaledPath = Path.move(scaledPath, { x: -1 * dims.min.x, y: -1 * dims.min.y })
  return scaledPath
}
