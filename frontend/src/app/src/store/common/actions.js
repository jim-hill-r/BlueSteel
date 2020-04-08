import * as path from '../../logic/path'
import { axios } from 'boot/axios'

const RETRY_LIMIT = 3
const STABLIZE_COUNT = 1

export function fetchPatterns (ctx) {
  let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  letters.forEach(letter => {
    axios.get(`https://eel3-data.s3.us-east-2.amazonaws.com/patterns/${letter}/master.json`)
      .then(res => {
        ctx.commit('setPattern', res.data)
      })
  })
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

export function practiceAttempted (ctx, update) {
  console.log(update)
  console.log(ctx.state.history)
  ctx.commit('incrementAttempts', update.letter)
  if (update.success) {
    ctx.commit('recordSuccess', update.letter)
    ctx.commit('updateFeedback', 'Good Job!')
    ctx.commit('nextLetter')
    ctx.dispatch('resetLetter', update.letter)
  } else {
    ctx.commit('updateFeedback', 'Try again!')
    if (ctx.state.history[update.letter].attempts >= RETRY_LIMIT) {
      ctx.commit('nextLetter')
      ctx.dispatch('resetLetter', update.letter)
    }
  }
  if (ctx.state.history[update.letter].singleAttemptSuccesses >= STABLIZE_COUNT) {
    ctx.dispatch('stabilizeLetter', update.letter)
  }
  if (ctx.state.activeQueue.length < 5) {
    ctx.dispatch('activateLetter')
  }
}

export function resetLetter (ctx, letter) {
  ctx.commit('resetLetter', letter)
}

export function stabilizeLetter (ctx, letter) {
  ctx.commit('stabilizeLetter', letter)
}

export function activateLetter (ctx, letter) {

}

export function lowActive (ctx, level) {

}

export function staleFail (ctx, level) {

}
