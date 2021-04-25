import type { LocationQuery, Router } from 'vue-router';
import { setCookie } from '@/utils/cookies';
import NProgress from 'nprogress';
import { cacheStore } from '@/store/modules/cache';
const whiteList = ['/login'];

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    NProgress.start();
    const { query } = to;
    const userInfo = cacheStore.userInfo;
    if (userInfo && !query.session) {
      try {
        if (to.path === '/login') {
          next({ path: '/' });
          NProgress.done();
        } else {
          next();
        }
      } catch (error) {
        cacheStore.COMMIT_RESETUSERINFO();
        cacheStore.TOGGLE_LOGIN(false);
        next(`/login?redirect=${to.path}`);
      }
    } else {
      // cas跳转后设置session和请求用户信息
      if (query.session) {
        setCookie('session', query.session);
        const otherQuery = getOtherQuery(query, 'session');
        await cacheStore.GetUserInfoAction();
        cacheStore.TOGGLE_LOGIN(true);
        next({ path: to.path || '/', query: otherQuery });
      } else {
        if (whiteList.indexOf(to.path) !== -1) {
          next();
        } else {
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
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
