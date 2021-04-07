import { RouteRecordRaw } from 'vue-router';
const product: RouteRecordRaw[] = [
  {
    path: 'product',
    name: 'PubProduct',
    meta: {
      title: '产品管理',
      ignoreKeepAlive: true,
    },
    redirect: { name: 'PubProductAll' },
  },
  {
    path: 'product/all',
    name: 'PubProductAll',
    meta: {
      title: '全部产品',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/pub/product/all/index.vue'),
  },
  {
    path: 'product/evaluated',
    name: 'PubProductEvaluated',
    meta: {
      title: '待评估列表',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/pub/product/evaluated/index.vue'),
  },
  {
    path: 'product/list',
    name: 'PubProductList',
    meta: {
      title: '产品列表',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/pub/product/list/index.vue'),
  },
];
export default product;
