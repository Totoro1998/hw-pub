import AppLayout from '@/layout/index.vue';
import { RouteRecordRaw } from 'vue-router';

const dbRouteConfig: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: '报表',
    component: AppLayout,
    children: [
      {
        path: 'product',
        name: 'DBProduct',
        meta: {
          title: '产品报表',
          ignoreKeepAlive: true,
        },
        component: () => import('@/views/dashboard/Product.vue'),
      },
      {
        path: 'revenue',
        name: 'DBRevenue',
        meta: {
          title: '收入报表',
          ignoreKeepAlive: true,
        },
        component: () => import('@/views/dashboard/Revenue.vue'),
      },
    ],
  },
];
export default dbRouteConfig;
