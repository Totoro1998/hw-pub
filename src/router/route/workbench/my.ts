import { RouteRecordRaw } from 'vue-router';
const my: RouteRecordRaw[] = [
  {
    path: 'my',
    name: 'WBMy',
    meta: {
      title: '我的工作台',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/workbench/my/index.vue'),
  },
];
export default my;
