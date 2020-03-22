import { normalizePath } from '../../logic/normalize'
import { axios } from 'boot/axios'

export function fetchAvailablePatterns (ctx) {
  let config = {
    headers: {
      'accept': 'application/json'
    }
  }
  axios.get(`https://eel3-data.s3.us-east-2.amazonaws.com?list-type=2&Prefix=patterns/`, config)
    .then(res => {
      ctx.commit('setPatternList', res)
    })
}

export function fetchPattern (ctx, letter) {
  axios.get(`https://eel3-data.s3.us-east-2.amazonaws.com/patterns/${letter}/2020-03-22T05:43:11.917Z.json`)
    .then(res => {
      ctx.commit('setPattern', res.data)
    })
}

export function uploadPattern (ctx, pattern) {
  pattern.path = normalizePath(pattern.path)
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
}
