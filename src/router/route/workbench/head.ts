import { RouteRecordRaw } from 'vue-router';
const head: RouteRecordRaw[] = [
  {
    path: 'head',
    name: 'WBHead',
    meta: {
      title: 'Head审核',
      ignoreKeepAlive: true,
    },
    redirect: { name: 'WBHeadBill' },
  },
  {
    path: 'head/bill',
    name: 'WBHeadBill',
    meta: {
      title: '结算单审核',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/workbench/head/bill.vue'),
  },
];
export default head;
