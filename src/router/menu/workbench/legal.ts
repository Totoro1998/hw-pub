import { MenuItem } from '@/types/config';

const legal: MenuItem = {
  path: 'legal',
  title: '法务审核',
  icon: '',
  children: [
    {
      path: 'invoice',
      title: '发票审核',
      icon: '',
    },
    {
      path: 'privacy',
      title: '隐私政策审核',
      icon: '',
    },
    {
      path: 'contract',
      title: '合同审核',
      icon: '',
    },
  ],
};
export default legal;
