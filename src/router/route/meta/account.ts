import { RouteRecordRaw } from 'vue-router';
const account: RouteRecordRaw[] = [
  {
    path: 'account',
    name: 'MetaAccount',
    meta: {
      title: 'account',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/meta/account/index.vue'),
  },
];
export default account;
