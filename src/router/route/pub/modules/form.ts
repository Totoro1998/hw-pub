import { RouteRecordRaw } from 'vue-router';

const form: RouteRecordRaw[] = [
  {
    path: 'pub/form',
    name: 'PubForm',
    meta: {
      title: '表单',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/pub/form/index.vue'),
  },
];

export default form;
