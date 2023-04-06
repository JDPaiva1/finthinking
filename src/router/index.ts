import { auth } from '@/firebaseConfig'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginSignupView.vue'),
      beforeEnter: () => {
        if (auth?.currentUser) return false
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/LoginSignupView.vue'),
      beforeEnter: () => {
        if (auth?.currentUser) return false
      }
    },
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

router.beforeEach(async (to) => {
  const isAuthenticated = !!auth.currentUser
  if(!isAuthenticated && to.name !== 'login' && to.name !== 'signup') {
    return { name: 'login' }
  }
})

export default router
