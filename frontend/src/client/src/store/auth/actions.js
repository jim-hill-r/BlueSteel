export function authenticate (ctx) {
  console.log('Authenticating...')
  let redirectUrl =
    window.location.protocol + '//' +
    window.location.hostname + ':8080' + '/' +
    'signin'
  window.location.href = encodeURI(
    'https://auth.eel.education/login?' +
    'client_id=' + ctx.state.clientId +
    '&response_type=token' +
    '&scope=openid' +
    '&redirect_uri=' + redirectUrl
  )
}

export function signin (ctx, urlHash) {
  console.log('Signing in...')
  let parameters = urlHash.substring(1).split('&')
  let token = parameters[0].substring(9)
  ctx.commit('setToken', token)
  ctx.commit('setIsAuthenticated', true)
}

export function unauthenticate (ctx) {
  console.log('Unauthenticating...')
  let redirectUrl =
    window.location.protocol + '//' +
    window.location.hostname + ':8080' + '/' +
    'signout'
  window.location.href = encodeURI(
    'https://auth.eel.education/logout?' +
    'client_id=' + ctx.state.clientId +
    '&logout_uri=' + redirectUrl
  )
}

export function signout (ctx) {
  console.log('Signing out...')
  ctx.commit('setToken', '')
  ctx.commit('setIsAuthenticated', false)
}

export function fetchPermissions (ctx) {
  console.log('Fetching permissions...')
}
