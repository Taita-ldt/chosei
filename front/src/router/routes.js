const routes = [
  {
    path: '/',
    component: () => import('layouts/main-layout.vue'),
    children: [
      { path: '', component: () => import('pages/top.vue'), meta: { requireAuth: true } },
      { path: 'login', component: () => import('pages/login.vue') },
      { path: 'user', component: () => import('pages/select-date.vue'), meta: { requireAuth: true } },
      { path: 'auth_error', component: () => import('pages/error401.vue') },
      { path: 'useredit', component: () => import('pages/user-edit.vue'), meta: { requireAuth: true } }
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/error404.vue'),
  });
}

export default routes;
