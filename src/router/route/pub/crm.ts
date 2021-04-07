import { RouteRecordRaw } from 'vue-router';
const crm: RouteRecordRaw[] = [
  {
    path: 'crm',
    name: 'PubCrm',
    meta: {
      title: 'CRM',
      ignoreKeepAlive: true,
    },
    redirect: { name: 'PubCrmAll' },
  },
  {
    path: 'crm/all',
    name: 'PubCrmAll',
    meta: {
      title: '全部客户',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/pub/crm/all/index.vue'),
  },
  {
    path: 'crm/opening',
    name: 'PubCrmOpening',
    meta: {
      title: '公海',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/pub/crm/opening/index.vue'),
  },
  {
    path: 'crm/following',
    name: 'PubCrmFollowing',
    meta: {
      title: '跟进中',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/pub/crm/following/index.vue'),
  },
];
export default crm;
