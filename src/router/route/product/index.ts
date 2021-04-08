import { RouteRecordRaw } from 'vue-router';
import AppLayout from '@/layout/index.vue';
const product: RouteRecordRaw = {
  path: '/product',
  name: 'Product',
  meta: {
    title: '产品',
    ignoreKeepAlive: true,
  },
  component: AppLayout,
  redirect: { name: 'ProductList' },
  children: [
    {
      path: 'list',
      name: 'ProductList',
      meta: {
        title: '产品',
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/product/index.vue'),
    },
  ],
};
export default product;
