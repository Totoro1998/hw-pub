import { RouteRecordRaw } from 'vue-router';
const agency: RouteRecordRaw[] = [
  {
    path: 'agency',
    name: 'MetaAgency',
    meta: {
      title: 'agency',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/meta/agency/index.vue'),
  },
];
export default agency;
