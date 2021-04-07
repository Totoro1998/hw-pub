import { RouteRecordRaw } from 'vue-router';
const platform: RouteRecordRaw[] = [
  {
    path: 'platform',
    name: 'MetaPlatform',
    meta: {
      title: 'platform',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/meta/platform/index.vue'),
  },
];
export default platform;
