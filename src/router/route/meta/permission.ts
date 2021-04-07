import { RouteRecordRaw } from 'vue-router';
const permission: RouteRecordRaw[] = [
  {
    path: 'permission',
    name: 'MetaPermission',
    meta: {
      title: 'permission',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/meta/permission/index.vue'),
  },
];
export default permission;
