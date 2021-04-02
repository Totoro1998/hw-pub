import { RouteRecordRaw } from 'vue-router';
import AppLayout from '@/layout/index.vue';

const workbench: RouteRecordRaw = {
  path: '/workbench',
  component: AppLayout,
  redirect: '/workbench/index',
  meta: {
    icon: '',
  },
  children: [
    {
      path: 'index',
      name: 'Workbench',
      meta: {
        title: '工作台',
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/pub/workbench/index.vue'),
    },
  ],
};

export default workbench;
