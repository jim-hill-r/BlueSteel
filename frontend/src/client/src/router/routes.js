const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { name: 'home', path: '', component: () => import('pages/Index.vue') },
      { name: 'letter', path: 'letter', component: () => import('pages/Letter.vue') },
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
