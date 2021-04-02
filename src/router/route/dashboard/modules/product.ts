import { RouteRecordRaw } from 'vue-router';

const product: RouteRecordRaw[] = [
  {
    path: 'product',
    name: 'DBProduct',
    meta: {
      title: '产品报表',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/dashboard/Product.vue'),
  },
];

export default product;
