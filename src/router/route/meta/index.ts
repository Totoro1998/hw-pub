import { RouteRecordRaw } from 'vue-router';
import AppLayout from '@/layout/index.vue';

import account from './account';
import agency from './agency';
import archieves from './archieves';
import contractTemplates from './contract-templates';
import currency from './currency';
import organization from './organization';
import payCategory from './pay-category';
import permission from './permission';
import platform from './platform';
import webeyes from './webeyes';

const meta: RouteRecordRaw = {
  path: '/meta',
  name: 'Meta',
  meta: {
    title: '元数据',
    ignoreKeepAlive: true,
  },
  redirect: { name: 'MetaOrganization' },
  component: AppLayout,
  children: [
    ...organization,
    ...permission,
    ...webeyes,
    ...archieves,
    ...contractTemplates,
    ...currency,
    ...payCategory,
    ...account,
    ...agency,
    ...platform,
  ],
};
export default meta;
