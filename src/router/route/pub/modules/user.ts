import { RouteRecordRaw } from 'vue-router';

const user: RouteRecordRaw[] = [
  {
    path: 'pub/user',
    name: 'PubUser',
    meta: {
      title: '用户',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/pub/user/index.vue'),
  },
];

export default user;
