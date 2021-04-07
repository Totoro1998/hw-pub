import { RouteRecordRaw } from 'vue-router';
const currency: RouteRecordRaw[] = [
  {
    path: 'currency',
    name: 'MetaCurrency',
    meta: {
      title: 'currency',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/meta/currency/index.vue'),
  },
];
export default currency;
