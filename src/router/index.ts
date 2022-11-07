import { createRouter, createWebHashHistory } from 'vue-router'
import { useTitle } from '@vueuse/core'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import i18n from '@/locale'

import DefaultLayout from '@/layout/default-layout.vue'
import appRoutes from './routes'
import createRouteGuard from './guard'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      name: 'root',
      path: '/',
      component: DefaultLayout,
      children: appRoutes,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/notFound/index.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

createRouteGuard(router)

router.beforeEach((to) => {
  if (to?.meta?.locale) {
    useTitle(`${i18n.global.t(to.meta.locale)} - Bug Analysis`)
  }
})

export default router
