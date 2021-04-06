import { MenuItem } from '@/types/config';

const work: MenuItem = {
  path: 'work',
  title: '业务',
  icon: '',
  children: [
    {
      path: 'pub',
      title: '发行业务',
      icon: '',
      children: [
        {
          path: 'charts',
          title: '图表',
          icon: '',
          children: [
            {
              path: 'bar',
              title: '柱状图',
              icon: '',
            },
            {
              path: 'line',
              title: '折线图',
              icon: '',
            },
            {
              path: 'charts',
              title: '饼图',
              icon: '',
            },
          ],
        },
        {
          path: 'form',
          title: '表单',
          icon: '',
        },
        {
          path: 'table',
          title: '表格',
          icon: '',
        },
        {
          path: 'user',
          title: '用户',
          icon: '',
        },
      ],
    },
    {
      path: 'hw',
      title: 'HW业务',
      icon: '',
    },
  ],
};
export default work;
