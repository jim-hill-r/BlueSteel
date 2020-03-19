const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'tracing', component: () => import('pages/Tracing.vue') },
      { path: 'pattern', component: () => import('pages/Pattern.vue') },
      { path: 'freeform', component: () => import('pages/Freeform.vue') },
      { path: 'training', component: () => import('pages/Training.vue') }
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
