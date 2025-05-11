// src/router/index.ts
import { createRouter, createWebHistory, type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router'
import { useAuthStore } from '@/modules/auth/store'


const routes = [
  { path: '/login',          component: () => import('@/views/auth/LoginView.vue') },
  {
    path: '/auth/callback',
    component: () => import('@/views/auth/CallbackView.vue'),
    alias: '/auth/google/callback'
  },
  { path: '/about',          component: () => import('@/views/AboutView.vue') },
  {
    path: '/sheets',
    component: () => import('@/modules/sheets/pages/SheetListPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/sheets/:id',
    component: () => import('@/modules/sheets/pages/SheetDetailPage.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  // **Sidst** — kun hvis ingen af de ovenstående matchede:
  { path: '/:catchAll(.*)',  redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach(async (to: RouteLocationNormalized, _from, next: NavigationGuardNext) => {
  const auth = useAuthStore()      // ← nu ligger det her, så PINIA er allerede monteret
  // 1) Hvis vi har token men ingen user, hent user
  if (auth.token && !auth.user) {
    try {
      await auth.fetchMe()
    } catch {
      auth.logout()
    }
  }
  // 2) Hvis route kræver auth, men user IKKE er logget ind → til /login
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return next('/login')
  }
  // 3) Ellers fortsæt
  next()
})

export default router
