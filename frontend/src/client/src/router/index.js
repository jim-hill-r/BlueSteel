import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function ({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    console.log(to)
    console.log(store.state.auth.permissions)
    console.log(store.state.auth.permissions.includes(to.meta.requiredPermission))
    if (to.meta == null ||
      to.meta.requiredPermission == null ||
      store.state.auth.permissions.includes(to.meta.requiredPermission)) {
      next()
    } else {
      next({ name: '404' })
    }
  })

  return Router
}
