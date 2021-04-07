import { RouteRecordRaw } from 'vue-router';
const contractTemplates: RouteRecordRaw[] = [
  {
    path: 'contractTemplates',
    name: 'MetaContractTemplates',
    meta: {
      title: 'contractTemplates',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/meta/contract-templates/index.vue'),
  },
];
export default contractTemplates;
