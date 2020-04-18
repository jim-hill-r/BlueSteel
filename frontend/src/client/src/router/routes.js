const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { name: 'home', path: '', component: () => import('pages/Index.vue') },
      { name: 'tracing', path: 'tracing', component: () => import('pages/Tracing.vue') },
      { name: 'pattern', path: 'pattern', component: () => import('pages/Pattern.vue') },
      { name: 'freeform', path: 'freeform', component: () => import('pages/Freeform.vue') },
      { name: 'word', path: 'word', component: () => import('pages/Word.vue') },
      { name: 'congratulations', path: 'congratulations', component: () => import('pages/Congratulations.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
