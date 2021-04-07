import { RouteRecordRaw } from 'vue-router';
const organization: RouteRecordRaw[] = [
  {
    path: 'organization',
    name: 'MetaOrganization',
    meta: {
      title: 'organization',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/meta/organization/index.vue'),
  },
];
export default organization;
