import my from './my';
import legal from './legal';
import finance from './finance';
import head from './head';
import { MenuItem } from '@/types/config';
const workbench: MenuItem = {
  path: 'workbench',
  title: '工作台',
  icon: '',
  children: [my, legal, finance, head],
};
export default workbench;
