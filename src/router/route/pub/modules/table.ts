import { RouteRecordRaw } from 'vue-router';

const table: RouteRecordRaw[] = [
  {
    path: 'pub/table',
    name: 'PubTable',
    meta: {
      title: '表格',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/pub/table/index.vue'),
  },
];

export default table;
