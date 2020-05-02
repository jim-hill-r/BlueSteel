import { axios } from 'boot/axios'

const STALE_REINTRODUCE_COUNT = 2

// //////////////////
// FETCH FROM CLOUD
// //////////////////
export function fetchLetter (ctx, letter) {
  if (ctx.state.patterns[letter] == null) {
    axios.get(`https://eel3-data.s3.us-east-2.amazonaws.com/patterns/${letter}/master.json`)
      .then(res => {
        let pattern = {
          boundary: res.data.boundary || {
            top: 0,
            ascenderLine: res.data.dimensions.upperGuidePixels,
            capLine: res.data.dimensions.upperGuidePixels,
            meanLine: res.data.dimensions.middleGuidePixels,
            baseLine: res.data.dimensions.lowerGuidePixels,
            beardLine: res.data.dimensions.lowestGuidePixels,
            bottom: res.data.dimensions.heightPixels
          },
          letter: res.data.letter,
          path: res.data.path
        }
        ctx.commit('setPattern', pattern)
      }).catch(err => err) // TODO: Properly catch error
  }
}

export function fetchSequence (ctx) {
  let sequence = {
    expressions: [
      ['b', 'c', 'd', 'f'],
      ['g', 'h', 'l', 'r', 's', 't'],
      ['a', 'e', 'i', 'o', 'u'],
      ['v', 'm', 'n', 'p'],
      ['j', 'k', 'w'],
      ['q', 'w', 'x', 'y', 'z']
    ],
    words: [
      ['feature', 'coming', 'soon']
    ]
  }
  if (ctx.state.user != null && ctx.state.user.sequence != null && ctx.state.user.sequence === 'Tm9haCBH') {
    sequence = {
      expressions: [
        ['n', 't', 'm', 'f'],
        ['i', 'a', 'c']
      ],
      words: [
        ['in', 'it', 'if'],
        ['an', 'at', 'am']
      ]
    }
  }
  if (ctx.state.user != null && ctx.state.user.sequence != null && ctx.state.user.sequence === 'QnJlbmRh') {
    sequence = {
      expressions: [
        ['n', 'b', 's', 'r', 'k', 'e', 'p']
      ],
      words: [
        ['trains', 'are', 'cool'],
        ['planes', 'fly', 'high']
      ]
    }
  }
  if (ctx.state.user != null && ctx.state.user.sequence != null && ctx.state.user.sequence === 'jim') {
    sequence = {
      expressions: [
        ['j', 'i', 'm'],
        ['f']
      ],
      words: [
        ['jim', 'rocks']
      ]
    }
    ctx.commit('setRetryLimit', 1)
    ctx.commit('setStabilizeCount', 1)
    ctx.commit('setReintroduceCount', 1)
  }
  for (let i = 0; i < sequence.expressions.length; i++) {
    let bunch = sequence.expressions[i]
    for (let j = 0; j < bunch.length; j++) {
      ctx.dispatch('fetchLetter', bunch[j])
    }
  }
  for (let i = 0; i < sequence.words.length; i++) {
    let bunch = sequence.words[i]
    for (let j = 0; j < bunch.length; j++) {
      let word = bunch[j]
      for (let z = 0; z < word.length; z++) {
        ctx.dispatch('fetchLetter', word[j])
      }
    }
  }
  ctx.commit('setSequence', sequence)
  ctx.commit('resetState', ctx.state.level)
}

// //////////////////
// UPLOAD TO CLOUD
// //////////////////
export function uploadPractice (ctx, update) {
  let sequence = ctx.state.user.sequence
  if (sequence == null || sequence === '') {
    return
  }

  let data = {
    update: update,
    user: ctx.state.user
  }

  let now = new Date()
  let timestamp = now.toISOString()
  let config = {
    headers: {
      'content-type': 'application/json',
      'x-amz-acl': 'public-read'
    }
  }
  let filename = `${timestamp}.json`
  axios.put(`https://eel3-data.s3.us-east-2.amazonaws.com/practice/${sequence}/${filename}`, data, config)
}

// //////////////////
// LOCAL ACTIONS
// //////////////////
export function loginUser (ctx, user) {
  ctx.commit('setUser', user)
  ctx.dispatch('fetchSequence')
}

export function changeLevel (ctx, level) {
  ctx.commit('setLevel', level)
}

export function startPractice (ctx) {
  ctx.commit('resetState')
  ctx.dispatch('nextExpression')
}

export function practiceAttempted (ctx, update) {
  ctx.commit('incrementAttempts', update.expression)
  if (ctx.state.user.uploading) {
    update.technique = ctx.state.user.technique
    update.level = ctx.state.level
    ctx.dispatch('uploadPractice', update)
  }
  if (update.success) {
    ctx.commit('recordSuccess', update.expression)
    ctx.commit('resetFail')
    if (ctx.state.history[update.expression].singleAttemptSuccesses >= ctx.state.stabilizeCount) {
      ctx.commit('stabilizeexpression', update.expression)
    }
    ctx.dispatch('nextExpression')
    ctx.commit('resetExpression', update.expression)
  } else if (ctx.state.history[update.expression].attempts >= ctx.state.retryLimit) {
    ctx.commit('incrementFail')
    if (ctx.state.consecutiveFails >= ctx.state.activeQueue.length) {
      ctx.dispatch('staleFail')
    }
    ctx.dispatch('nextExpression')
    ctx.commit('resetExpression', update.expression)
  }
}

export function nextExpression (ctx) {
  if (ctx.state.activeQueue.length < 1) {
    ctx.dispatch('activateexpressions')
  }
  ctx.commit('nextExpression')
}

export function activateexpressions (ctx) {
  let countToReintroduce = 0

  if (ctx.state.pendingQueue.length > 0) {
    ctx.state.isFinalReview = false
    ctx.commit('activateNextBunch')
    countToReintroduce = Math.min(ctx.state.reintroduceCount, ctx.state.stableQueue.length)
  } else if (!ctx.state.isFinalReview) {
    ctx.state.isFinalReview = true
    countToReintroduce = ctx.state.stableQueue.length
  }

  for (let i = 0; i < countToReintroduce; i++) {
    const newexpression = ctx.state.stableQueue[0]
    ctx.commit('reintroduceexpression', newexpression)
  }
}

export function staleFail (ctx) {
  if (ctx.state.staleFails > (ctx.state.stableQueue.length / STALE_REINTRODUCE_COUNT)) {
    ctx.dispatch('activateexpressions')
    ctx.commit('resetStaleFail')
  } else if (ctx.state.stableQueue.length >= STALE_REINTRODUCE_COUNT) {
    for (let i = 0; i < STALE_REINTRODUCE_COUNT; i++) {
      const newexpression = ctx.state.stableQueue[0]
      ctx.commit('reintroduceexpression', newexpression)
    }
  } else {
    ctx.dispatch('activateexpressions')
  }
  ctx.commit('recordStaleFail')
  ctx.commit('resetFail')
}

export function completedTechnique (ctx) {
  if (ctx.state.user.technique === 'Tracing') {
    ctx.commit('setTechnique', 'Pattern')
  } else if (this.level === 'pattern') {
    ctx.commit('setTechnique', 'Freeform')
  } else {
    ctx.commit('setTechnique', 'Tracing')
    this.$router.push({ name: 'congratulations' })
  }
  ctx.dispatch('startPractice')
}
