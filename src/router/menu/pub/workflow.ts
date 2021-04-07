import { MenuItem } from '@/types/config';

const workflow: MenuItem = {
  path: 'workflow',
  title: '工作流管理',
  icon: '',
  children: [
    {
      path: 'list',
      title: '工作流',
      icon: '',
    },
    {
      path: 'task',
      title: '任务环节',
      icon: '',
    },
  ],
};
export default workflow;
