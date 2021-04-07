import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import pubRouteConfig from './route/pub';
import productRouteConfig from './route/product';
import workbenchRouteConfig from './route/workbench';
import metaRouteConfig from './route/meta';

import commonRouteConfig from './route/common';
const routes: RouteRecordRaw[] = [
  ...commonRouteConfig,
  workbenchRouteConfig,
  pubRouteConfig,
  productRouteConfig,
  metaRouteConfig,
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
