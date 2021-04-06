import { AppRouteRecordRaw } from '@/types/config';
import AppLayout from '@/layout/index.vue';

const dbRouteConfig: AppRouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: '报表',
    hidden: false,
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
