import type { LocationQuery, Router } from 'vue-router';
import { getCookie, setCookie } from '@/utils/cookies';
import NProgress from 'nprogress';

const whiteList = ['/login'];

export function createPermissionGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    NProgress.start();
    if (getCookie('session')) {
      if (to.path === '/login') {
        next({ path: '/' });
        NProgress.done();
      } else {
        next();
      }
    } else {
      const { query } = to;
      if (query.session) {
        setCookie('session', query.session);
        const otherQuery = getOtherQuery(query, 'session');
        router.replace({ path: to.path || '/', query: otherQuery });
      }
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  });
  router.afterEach(() => {
    NProgress.done();
  });
}
const getOtherQuery = (query: LocationQuery, queryName: string) => {
  const initAcc: LocationQuery = {};
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== queryName) {
      acc[cur] = query[cur];
    }
    return acc;
  }, initAcc);
};
