import { RouteRecordRaw } from 'vue-router';
const archieves: RouteRecordRaw[] = [
  {
    path: 'archieves',
    name: 'MetaArchieves',
    meta: {
      title: 'archieves',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/meta/archieves/index.vue'),
  },
];
export default archieves;
