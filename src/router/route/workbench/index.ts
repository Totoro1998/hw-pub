import { RouteRecordRaw } from 'vue-router';
import AppLayout from '@/layout/index.vue';
import finance from './finance';
import head from './head';
import legal from './legal';
import my from './my';

const workbench: RouteRecordRaw = {
  path: '/workbench',
  name: 'WB',
  meta: {
    title: '工作台',
    ignoreKeepAlive: true,
  },
  redirect: { name: 'WBMy' },
  component: AppLayout,
  children: [...my, ...legal, ...finance, ...head],
};
export default workbench;
