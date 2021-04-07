import { RouteRecordRaw } from 'vue-router';
const payCategory: RouteRecordRaw[] = [
  {
    path: 'payCategory',
    name: 'MetaPayCategory',
    meta: {
      title: 'payCategory',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/meta/pay-category/index.vue'),
  },
];
export default payCategory;
