export default {
  path: 'manage',
  name: 'manage',
  component: () => import('@/views/manage/index.vue'),
  meta: {
    locale: 'menu.manage',
    requiresAuth: true,
    icon: 'icon-settings',
    order: 1,
  },
  children: [
    {
      path: 'memberManage',
      name: 'memberManage',
      component: () => import('@/views/manage/memberManage/index.vue'),
      meta: {
        locale: 'menu.manage.memberManage',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'bugTypeManage',
      name: 'bugTypeManage',
      component: () => import('@/views/manage/bugTypeManage/index.vue'),
      meta: {
        locale: 'menu.manage.bugTypeManage',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'bugManage',
      name: 'bugManage',
      component: () => import('@/views/manage/bugManage/index.vue'),
      meta: {
        locale: 'menu.manage.bugManage',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
}
