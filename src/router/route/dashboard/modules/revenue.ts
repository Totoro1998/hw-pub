import { RouteRecordRaw } from 'vue-router';

const revenue: RouteRecordRaw[] = [
  {
    path: 'revenue',
    name: 'DBRevenue',
    meta: {
      title: '产品报表',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/dashboard/Revenue.vue'),
  },
];

export default revenue;
