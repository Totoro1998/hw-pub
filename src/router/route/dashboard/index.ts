import { RouteRecordRaw } from 'vue-router';
import routeConfig from './modules';
import AppLayout from '@/layout/index.vue';
const dbRouteConfig: RouteRecordRaw = {
  path: '/dashboard',
  component: AppLayout,
  children: routeConfig,
};
export default dbRouteConfig;
