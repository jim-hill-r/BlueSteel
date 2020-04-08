import Vue from 'vue'

export function setPattern (state, pattern) {
  Vue.set(state.patterns, pattern.letter, pattern)
}

export function updateFeedback (state, feedback) {
  state.feedback = feedback
}

export function updateInstructions (state, instructions) {
  state.instructions = instructions
}

export function resetLetter (state, letter) {
  let letterHistory = state.history[letter] || {}
  letterHistory.previousAttempts = letterHistory.attempts || 0
  if (letterHistory.previousAttempts > 1) {
    letterHistory.totalSingleAttemptSuccesses = 0
  }
  letterHistory.attempts = 0
  Vue.set(state.history, letter, letterHistory)
}

export function incrementAttempts (state, letter) {
  let letterHistory = state.history[letter] || {}
  letterHistory.attempts = letterHistory.attempts + 1 || 1
  letterHistory.totalAttempts = letterHistory.totalAttempts + 1 || 1
  Vue.set(state.history, letter, letterHistory)
}

export function recordSuccess (state, letter) {
  let letterHistory = state.history[letter] || {}
  letterHistory.success = true
  if (letterHistory.attempts === 1) {
    letterHistory.singleAttemptSuccesses = letterHistory.singleAttemptSuccesses + 1 || 1
    letterHistory.totalSingleAttemptSuccesses = letterHistory.totalSingleAttemptSuccesses + 1 || 1
  }
  Vue.set(state.history, letter, letterHistory)
}

export function nextLetter (state) {
  let next = state.activeQueue.shift()
  if (state.letter != null && state.letter !== '') {
    state.activeQueue.push(state.letter)
  }
  state.letter = next
}

export function stabilizeLetter (state, letter) {
  var index = state.activeQueue.indexOf(letter)
  if (index !== -1) {
    state.activeQueue.splice(index, 1)
  }
  state.stableQueue.push(letter)
}

export function activateLetter (state, letter) {
  var index = state.pendingQueue.indexOf(letter)
  if (index !== -1) {
    state.pendingQueue.splice(index, 1)
  }
  state.activeQueue.push(letter)
}

export function resetState (state) {
  state.history = {}
  state.letter = ''
  state.activeQueue = []
  state.stableQueue = []
  state.pendingQueue = ['b', 'c', 'd', 'f', 'g', 'h', 'l', 'r', 's', 't', 'a', 'e', 'i', 'o', 'u', 'v', 'm', 'n', 'p', 'j', 'k', 'q', 'w', 'x', 'y', 'z']
}
