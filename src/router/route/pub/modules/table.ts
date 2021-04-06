import { AppRouteRecordRaw } from '@/types/config';

const table: AppRouteRecordRaw[] = [
  {
    path: 'pub/table',
    name: 'PubTable',
    hidden: false,
    meta: {
      title: '表格',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/pub/table/index.vue'),
  },
];

export default table;
