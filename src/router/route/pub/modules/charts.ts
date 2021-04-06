import { AppRouteRecordRaw } from '@/types/config';

const charts: AppRouteRecordRaw[] = [
  {
    path: 'pub/charts/bar',
    hidden: false,
    name: 'PubBarChart',
    meta: {
      title: '柱状图',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/pub/charts/BarChart.vue'),
  },
  {
    path: 'pub/charts/line',
    name: 'PubLineChart',
    hidden: false,
    meta: {
      title: '折线图',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/pub/charts/LineChart.vue'),
  },
  {
    path: 'pub/charts/pipe',
    name: 'PubPipeChart',
    hidden: false,
    meta: {
      title: '饼图',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/pub/charts/PipeChart.vue'),
  },
];

export default charts;
