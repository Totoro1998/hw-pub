import { RouteRecordRaw } from 'vue-router';
const audit: RouteRecordRaw[] = [
  {
    path: 'audit',
    name: 'PubAudit',
    meta: {
      title: '审核列表',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/pub/audit/index.vue'),
  },
];
export default audit;
