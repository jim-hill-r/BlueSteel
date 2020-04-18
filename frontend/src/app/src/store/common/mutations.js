import Vue from 'vue'

export function setUser (state, user) {
  state.user = user
}

export function setSequence (state, sequence) {
  state.sequence = sequence
}

export function setRetryLimit (state, limit) {
  state.retryLimit = limit
}

export function setStabilizeCount (state, count) {
  state.stabilizeCount = count
}

export function setReintroduceCount (state, count) {
  state.reintroduceCount = count
}

export function setPattern (state, pattern) {
  Vue.set(state.patterns, pattern.letter, pattern)
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

export function activateNextBunch (state) {
  let nextBunch = state.pendingQueue.shift()
  while (nextBunch.length > 0) {
    let letter = nextBunch.shift()
    state.activeQueue.push(letter)
  }
}

export function reintroduceLetter (state, letter) {
  var index = state.stableQueue.indexOf(letter)
  if (index !== -1) {
    state.stableQueue.splice(index, 1)
  }
  state.activeQueue.push(letter)
}

export function resetState (state, level) {
  state.history = {}
  state.letter = ''
  state.activeQueue = []
  state.stableQueue = []
  if (level === 'word') {
    state.pendingQueue = Array.from(state.sequence.words, block => Array.from(block, word => word))
  } else {
    state.pendingQueue = Array.from(state.sequence.letters, block => Array.from(block, letter => letter))
  }
}
