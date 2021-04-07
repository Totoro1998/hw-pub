import { RouteRecordRaw } from 'vue-router';

const commonRouteConfig: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'WB' },
    name: 'home',
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/login/index.vue'),
  },
];

export default commonRouteConfig;
