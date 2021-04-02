import { RouteRecordRaw } from 'vue-router';

const charts: RouteRecordRaw[] = [
  {
    path: 'pub/charts/bar',
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
    meta: {
      title: '折线图',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/pub/charts/LineChart.vue'),
  },
  {
    path: 'pub/charts/pipe',
    name: 'PubPipeChart',
    meta: {
      title: '饼图',
      ignoreKeepAlive: true,
    },
    component: () => import('@/views/pub/charts/PipeChart.vue'),
  },
];

export default charts;
