import { RouteRecordRaw } from 'vue-router';
const bill: RouteRecordRaw[] = [
  {
    path: 'bill',
    name: 'PubBill',
    meta: {
      title: '结算管理',
      ignoreKeepAlive: true,
    },
    redirect: { name: 'PubBillOpen' },
  },
  {
    path: 'bill/open',
    name: 'PubBillOpen',
    meta: {
      title: '结算中',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/pub/bill/open/index.vue'),
  },
  {
    path: 'bill/audit',
    name: 'PubBillAudit',
    meta: {
      title: '审核中',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/pub/bill/audit/index.vue'),
  },
  {
    path: 'bill/done',
    name: 'PubBillDone',
    meta: {
      title: '结算完毕',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/pub/bill/done/index.vue'),
  },
];
export default bill;
