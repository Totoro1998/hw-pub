import { RouteRecordRaw } from 'vue-router';
const webeyes: RouteRecordRaw[] = [
  {
    path: 'webeyes',
    name: 'MetaWebeyes',
    meta: {
      title: 'webeyes',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/meta/webeyes/index.vue'),
  },
];
export default webeyes;
