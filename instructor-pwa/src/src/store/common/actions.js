import { axios } from 'boot/axios'

// //////////////////
// UPLOAD TO CLOUD
// //////////////////
export function uploadPattern (ctx, pattern) {
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
