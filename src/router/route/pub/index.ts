import { RouteRecordRaw } from 'vue-router';
import AppLayout from '@/layout/index.vue';

import audit from './audit';
import bill from './bill';
import config from './config';
import crm from './crm';
import product from './product';
import workflow from './workflow';

const pub: RouteRecordRaw = {
  path: '/pub',
  name: 'Pub',
  meta: {
    title: '发行',
    ignoreKeepAlive: true,
  },
  redirect: { name: 'PubAudit' },
  component: AppLayout,
  children: [...audit, ...crm, ...product, ...workflow, ...bill, ...config],
};
export default pub;
