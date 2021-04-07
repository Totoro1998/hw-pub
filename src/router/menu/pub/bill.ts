import { MenuItem } from '@/types/config';

const bill: MenuItem = {
  path: 'bill',
  title: '结算管理',
  icon: '',
  children: [
    {
      path: 'open',
      title: '结算中',
      icon: '',
    },
    {
      path: 'audit',
      title: '审核中',
      icon: '',
    },
    {
      path: 'done',
      title: '结算完毕',
      icon: '',
    },
  ],
};
export default bill;
