import Vue from 'vue'

export function setPattern (state, patternInfo) {
  Vue.set(state.patterns, patternInfo.letter, patternInfo.path)
}

export function setPatternList (state, patternList) {
  state.patternList = patternList
}
