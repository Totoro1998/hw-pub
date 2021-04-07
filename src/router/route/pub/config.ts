import { RouteRecordRaw } from 'vue-router';
const config: RouteRecordRaw[] = [
  {
    path: 'config',
    name: 'PubConfig',
    meta: {
      title: 'config',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/pub/config/index.vue'),
  },
];
export default config;
