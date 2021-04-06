import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/index.vue';
import dbRouteConfig from './route/dashboard';
import pubRouteConfig from './route/pub/modules';
import commonRouteConfig from './route/common';
import { AppRouteRecordRaw } from '@/types/config';
const routes: Array<AppRouteRecordRaw> = [
  //  报表
  ...dbRouteConfig,
  //  业务
  {
    path: '/work',
    showHeader: true,
    hidden: false,
    redirect: { name: 'PubUser' },
    component: AppLayout,
    children: [...pubRouteConfig],
    meta: {
      roles: ['work'],
      headerMenus: [
        { title: 'HW', path: 'hw', roles: ['work-hw'], icon: '' },
        { title: 'Pub', path: 'pub', roles: ['work-pub'], icon: '' },
      ],
    },
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
