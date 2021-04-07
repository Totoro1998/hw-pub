import { MenuItem } from '@/types/config';

const product: MenuItem = {
  path: 'product',
  title: '产品管理',
  icon: '',
  children: [
    {
      path: 'all',
      title: '全部产品',
      icon: '',
    },
    {
      path: 'evaluated',
      title: '待评估列表',
      icon: '',
    },
    {
      path: 'list',
      title: '产品列表',
      icon: '',
    },
  ],
};
export default product;
