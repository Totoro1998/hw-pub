import { AppRouteRecordRaw } from '@/types/config';

const user: AppRouteRecordRaw[] = [
  {
    path: 'pub/user',
    name: 'PubUser',
    hidden: false,
    meta: {
      title: '用户',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/pub/user/index.vue'),
  },
];

export default user;
