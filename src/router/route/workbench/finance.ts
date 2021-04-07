import { RouteRecordRaw } from 'vue-router';
const finance: RouteRecordRaw[] = [
  {
    path: 'finance',
    name: 'WBFinanceContract',
    meta: {
      title: '财务审核',
      ignoreKeepAlive: true,
    },
    redirect: { name: 'WBFinanceContract' },
  },
  {
    path: 'finance/contract',
    name: 'WBFinanceContract',
    meta: {
      title: '合同审核',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/workbench/finance/contract/index.vue'),
  },
  {
    path: 'finance/invoice',
    name: 'WBFinanceInvoice',
    meta: {
      title: '发票审核',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/workbench/finance/invoice/index.vue'),
  },
  {
    path: 'finance/bill',
    name: 'WBFinanceBill',
    meta: {
      title: '结算单审核',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/workbench/finance/bill/index.vue'),
  },
];
export default finance;
