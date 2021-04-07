import { RouteRecordRaw } from 'vue-router';
const workflow: RouteRecordRaw[] = [
  {
    path: 'workflow',
    name: 'PubWorkflow',
    meta: {
      title: '工作流管理',
      ignoreKeepAlive: true,
    },
    redirect: { name: 'PubWorkflowList' },
  },
  {
    path: 'workflow/list',
    name: 'PubWorkflowList',
    meta: {
      title: '工作流',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/pub/workflow/list/index.vue'),
  },
  {
    path: 'workflow/task',
    name: 'PubWorkflowTask',
    meta: {
      title: '任务环节',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/pub/workflow/task/index.vue'),
  },
];
export default workflow;
