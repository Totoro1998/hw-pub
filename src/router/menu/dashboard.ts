import { MenuItem } from '@/types/config';

const dashboard: MenuItem = {
  path: 'dashboard',
  title: '报表',
  icon: '',
  children: [
    {
      path: 'product',
      title: '产品报表',
      icon: '',
    },
    {
      path: 'revenue',
      title: '收入报表',
      icon: '',
    },
  ],
};
export default dashboard;
