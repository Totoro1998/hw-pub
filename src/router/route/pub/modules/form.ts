import { AppRouteRecordRaw } from '@/types/config';

const form: AppRouteRecordRaw[] = [
  {
    path: 'pub/form',
    name: 'PubForm',
    hidden: false,
    meta: {
      title: '表单',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/pub/form/index.vue'),
  },
];

export default form;
