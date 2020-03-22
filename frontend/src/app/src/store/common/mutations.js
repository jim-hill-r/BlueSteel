import Vue from 'vue'

export function setPattern (state, pattern) {
  Vue.set(state.patterns, pattern.letter, pattern)
}
