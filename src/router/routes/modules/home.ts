export default {
  path: 'home',
  name: 'home',
  component: () => import('@/views/home/index.vue'),
  meta: {
    locale: 'menu.home',
    requiresAuth: true,
    icon: 'icon-home',
    order: 0,
  },
}
