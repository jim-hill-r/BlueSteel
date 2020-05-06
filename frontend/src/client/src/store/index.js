import Vue from 'vue'
import Vuex from 'vuex'

import common from './common'
import auth from './auth'

Vue.use(Vuex)

const Store = new Vuex.Store({
  modules: {
    common,
    auth
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
})

export default function (/* { ssrContext } */) {
  return Store
}

export { Store }
