import AppLayout from '@/layout/index.vue';
import { AppRouteRecordRaw } from '@/types/config';

const commonRouteConfig: AppRouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'index' },
    hidden: true,
    component: AppLayout,
    children: [
      //  首页
      {
        path: 'index',
        name: 'index',
        meta: {
          title: '工作台',
          ignoreKeepAlive: true,
        },
        component: () => import('@/views/workbench/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: '/Login',
    hidden: true,
    meta: {
      title: '登录',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/login/index.vue'),
  },
];

export default commonRouteConfig;
