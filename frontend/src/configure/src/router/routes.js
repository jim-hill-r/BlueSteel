const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { name: 'home', path: '', component: () => import('pages/Index.vue') },
      { name: 'sequence', path: 'sequence', component: () => import('pages/Sequence.vue') },
      { name: 'review', path: 'review', component: () => import('pages/Review.vue') },
      { name: 'training', path: 'training', component: () => import('pages/Training.vue') }
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
