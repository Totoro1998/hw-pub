import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AppLayout from '@/layout/index.vue';
import dbRouteConfig from './route/dashboard';
import pubRouteConfig from './route/pub/modules';
import commonRouteConfig from './route/common';
const routes: Array<RouteRecordRaw> = [
  //  首页
  {
    path: '/',
    redirect: { name: 'index' },
    component: AppLayout,
    children: [
      //  首页
      {
        path: 'index',
        name: 'index',
        meta: {
          title: '工作台',
          ignoreKeepAlive: true,
        },
        component: () => import('@/views/workbench/index.vue'),
      },
    ],
  },
  //  报表
  dbRouteConfig,
  //  业务
  {
    path: '/work',
    redirect: { name: 'PubUser' },
    component: AppLayout,
    children: [...pubRouteConfig],
  },
  ...commonRouteConfig,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}
export default router;
