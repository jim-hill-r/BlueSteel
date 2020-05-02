import Vue from 'vue'

export function setUser (state, user) {
  state.user = user
}

export function setSequence (state, sequence) {
  state.sequence = sequence
}

export function setLevel (state, level) {
  console.log(level)
  state.level = level
}

export function setTechnique (state, technique) {
  Vue.set(state.user, 'technique', technique)
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

export function resetExpression (state, expression) {
  let expressionHistory = state.history[expression] || {}
  expressionHistory.previousAttempts = expressionHistory.attempts || 0
  if (expressionHistory.previousAttempts > 1) {
    expressionHistory.totalSingleAttemptSuccesses = 0
  }
  expressionHistory.attempts = 0
  Vue.set(state.history, expression, expressionHistory)
}

export function incrementAttempts (state, expression) {
  let expressionHistory = state.history[expression] || {}
  expressionHistory.attempts = expressionHistory.attempts + 1 || 1
  expressionHistory.totalAttempts = expressionHistory.totalAttempts + 1 || 1
  Vue.set(state.history, expression, expressionHistory)
}

export function incrementFail (state) {
  state.consecutiveFails = state.consecutiveFails + 1 || 1
}

export function resetFail (state) {
  state.consecutiveFails = 0
}

export function recordStaleFail (state) {
  state.staleFails = state.staleFails + 1 || 1
}

export function resetStaleFail (state) {
  state.staleFails = 0
}

export function recordSuccess (state, expression) {
  let expressionHistory = state.history[expression] || {}
  expressionHistory.success = true
  if (expressionHistory.attempts === 1) {
    expressionHistory.singleAttemptSuccesses = expressionHistory.singleAttemptSuccesses + 1 || 1
    expressionHistory.totalSingleAttemptSuccesses = expressionHistory.totalSingleAttemptSuccesses + 1 || 1
    if (expressionHistory.totalAttempts === 1) { // Bonus for getting it right on your very first try
      expressionHistory.singleAttemptSuccesses = expressionHistory.singleAttemptSuccesses + 1
      expressionHistory.totalSingleAttemptSuccesses = expressionHistory.totalSingleAttemptSuccesses + 1
    }
  }
  Vue.set(state.history, expression, expressionHistory)
}

export function nextExpression (state) {
  let next = state.activeQueue.shift()
  state.expression = next
  state.activeQueue.push(next)
}

export function stabilizeExpression (state, expression) {
  var index = state.activeQueue.indexOf(expression)
  if (index !== -1) {
    state.activeQueue.splice(index, 1)
  }
  state.stableQueue.push(expression)
}

export function activateNextBunch (state) {
  let nextBunch = state.pendingQueue.shift()
  while (nextBunch.length > 0) {
    let expression = nextBunch.shift()
    state.activeQueue.push(expression)
  }
}

export function reintroduceExpression (state, expression) {
  var index = state.stableQueue.indexOf(expression)
  if (index !== -1) {
    state.stableQueue.splice(index, 1)
  }
  state.activeQueue.push(expression)
}

export function resetState (state) {
  state.history = {}
  state.expression = ''
  state.activeQueue = []
  state.stableQueue = []
  if (state.level === 'word') {
    state.pendingQueue = Array.from(state.sequence.words, block => Array.from(block, word => word))
  } else {
    state.pendingQueue = Array.from(state.sequence.expressions, block => Array.from(block, expression => expression))
  }
}
