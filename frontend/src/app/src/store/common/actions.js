import * as path from '../../logic/path'
import { axios } from 'boot/axios'

const RETRY_LIMIT = 2
const STABLIZE_COUNT = 1
const REINTRODUCE_COUNT = 8

export function fetchLetter (ctx, letter) {
  if (ctx.state.patterns[letter] == null) {
    axios.get(`https://eel3-data.s3.us-east-2.amazonaws.com/patterns/${letter}/master.json`)
      .then(res => {
        ctx.commit('setPattern', res.data)
      }).catch(err => err) // TODO: Properly catch error
  }
}

export function uploadPattern (ctx, pattern) {
  pattern.path = path.simplify(pattern.path)
  pattern.quality = pattern.quality.toLowerCase()

  let now = new Date()
  let timestamp = now.toISOString()
  let config = {
    headers: {
      'content-type': 'application/json',
      'x-amz-acl': 'public-read'
    }
  }
  let filename = `${timestamp}.json`
  axios.put(`https://eel3-data.s3.us-east-2.amazonaws.com/patterns/${pattern.letter}/${filename}`, pattern, config)

  let masterFilename = `master.json`
  if (pattern.quality === 'excellent') {
    axios.put(`https://eel3-data.s3.us-east-2.amazonaws.com/patterns/${pattern.letter}/${masterFilename}`, pattern, config)
  }
}

export function fetchSequence (ctx) {
  let sequence = {
    letters: [
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
  if (ctx.state.user != null && ctx.state.user.sequenceId != null && ctx.state.user.sequenceId === 'Tm9haCBH') {
    sequence = {
      letters: [
        ['n', 't', 'm', 'f'],
        ['i', 'a', 'c']
      ],
      words: [
        ['in', 'it', 'if'],
        ['an', 'at', 'am']
      ]
    }
  }
  ctx.commit('setSequence', sequence)
}

export function loginUser (ctx, sequenceId) {
  let user = {
    sequenceId: sequenceId
  }
  ctx.commit('setUser', user)
  ctx.dispatch('fetchSequence')
}

export function startPractice (ctx, level) {
  ctx.commit('resetState', level)
  ctx.dispatch('nextLetter')
}

export function practiceAttempted (ctx, update) {
  ctx.commit('incrementAttempts', update.letter)
  if (update.success) {
    ctx.commit('recordSuccess', update.letter)
    ctx.dispatch('nextLetter')
    ctx.dispatch('resetLetter', update.letter)
  } else if (ctx.state.history[update.letter].attempts >= RETRY_LIMIT) {
    ctx.dispatch('nextLetter')
    ctx.dispatch('resetLetter', update.letter)
  }
  if (ctx.state.history[update.letter].singleAttemptSuccesses >= STABLIZE_COUNT) {
    ctx.dispatch('stabilizeLetter', update.letter)
  }
}

export function nextLetter (ctx) {
  if (ctx.state.activeQueue.length < 2 && ctx.state.pendingQueue.length > 0) {
    ctx.dispatch('activateLetters')
    ctx.dispatch('nextLetter')
  } else {
    ctx.commit('nextLetter')
  }
}

export function resetLetter (ctx, letter) {
  ctx.commit('resetLetter', letter)
}

export function stabilizeLetter (ctx, letter) {
  ctx.commit('stabilizeLetter', letter)
}

export function activateLetters (ctx) {
  let countToAdd = Math.min(REINTRODUCE_COUNT, ctx.state.stableQueue.length)
  for (let i = 0; i < countToAdd; i++) {
    const newLetter = ctx.state.stableQueue[0]
    ctx.dispatch('fetchLetter', newLetter)
    ctx.commit('reintroduceLetter', newLetter)
  }
  for (let i = 0; i < ctx.state.pendingQueue[0].length; i++) {
    const newLetter = ctx.state.pendingQueue[0][i]
    for (let j = 0; j < newLetter.length; j++) {
      ctx.dispatch('fetchLetter', newLetter[j])
    }
  }
  ctx.commit('activateNextBunch')
}

export function lowActive (ctx, level) {

}

export function staleFail (ctx, level) {

}
