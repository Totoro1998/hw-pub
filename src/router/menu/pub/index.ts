import { MenuItem } from '@/types/config';
import audit from './audit';
import crm from './crm';
import product from './product';
import workflow from './workflow';
import bill from './bill';
import config from './config';
const pub: MenuItem = {
  path: 'pub',
  title: '发行',
  icon: '',
  children: [audit, crm, product, workflow, bill, config],
};
export default pub;
