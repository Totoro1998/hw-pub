import { MenuItem } from '@/types/config';

const finance: MenuItem = {
  path: 'finance',
  title: '财务审核',
  icon: '',
  children: [
    {
      path: 'contract',
      title: '合同审核',
      icon: '',
    },
    {
      path: 'invoice',
      title: '发票审核',
      icon: '',
    },
    {
      path: 'bill',
      title: '结算单审核',
      icon: '',
    },
  ],
};
export default finance;
