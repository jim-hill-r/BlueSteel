import { Store } from '../store/index.js'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { name: 'home', path: '', component: () => import('pages/Index.vue') },
      { name: 'letter', path: 'letter', meta: { requiredPermission: 'blue:practiceLetter' }, component: () => import('pages/Letter.vue') },
      { name: 'word', path: 'word', component: () => import('pages/Word.vue') },
      { name: 'congratulations', path: 'congratulations', component: () => import('pages/Congratulations.vue') },
      { name: 'authenticate',
        path: 'authenticate',
        beforeEnter: (to, from, next) => {
          Store.dispatch('auth/authenticate')
        }
      },
      { name: 'signin',
        path: 'signin',
        beforeEnter: (to, from, next) => {
          Store.dispatch('auth/signin')
        }
      },
      { name: 'unauthenticate',
        path: 'unauthenticate',
        beforeEnter: (to, from, next) => {
          Store.dispatch('auth/unauthenticate')
        }
      },
      { name: 'signout',
        path: 'signout',
        beforeEnter: (to, from, next) => {
          Store.dispatch('auth/signout')
        }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    name: '404',
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
