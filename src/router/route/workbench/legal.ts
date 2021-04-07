import { RouteRecordRaw } from 'vue-router';
const legal: RouteRecordRaw[] = [
  {
    path: 'legal',
    name: 'WBLegal',
    meta: {
      title: '法务审核',
      ignoreKeepAlive: true,
    },
    redirect: { name: 'WBLegalInvoice' },
  },
  {
    path: 'legal/invoice',
    name: 'WBLegalInvoice',
    meta: {
      title: '发票审核',
      ignoreKeepAlive: true,
    },
    redirect: { name: 'WBLegalInvoicePending' },
  },
  {
    path: 'legal/invoice/pending',
    name: 'WBLegalInvoicePending',
    meta: {
      title: '待审核',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/workbench/legal/invoice/pending.vue'),
  },
  {
    path: 'legal/invoice/done',
    name: 'WBLegalInvoiceDone',
    meta: {
      title: '已审核',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/workbench/legal/invoice/done.vue'),
  },
  {
    path: 'legal/privacy',
    name: 'WBLegalPrivacy',
    meta: {
      title: '隐私政策审核',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/workbench/legal/privacy/index.vue'),
  },
  {
    path: 'legal/contract',
    name: 'WBLegalContract',
    meta: {
      title: '合同审核',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/workbench/legal/contract/index.vue'),
  },
];
export default legal;
