import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/new',
      name: 'new',
      component: () => import('../views/AddView.vue')
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('../views/AddView.vue')
    }
  ]
})

export default router
