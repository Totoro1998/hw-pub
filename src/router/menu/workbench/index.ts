import { MenuItem } from '@/types/config';
import my from './my';
import legal from './legal';
import finance from './finance';
import head from './head';
const workbench: MenuItem = {
  path: 'workbench',
  title: '工作台',
  icon: '',
  children: [my, legal, finance, head],
};
export default workbench;
