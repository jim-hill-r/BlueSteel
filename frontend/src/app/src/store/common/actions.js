import { normalizePath } from '../../logic/normalize'
import { axios } from 'boot/axios'

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
  pattern.path = normalizePath(pattern.path)
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
