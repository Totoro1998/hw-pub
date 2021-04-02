import type { LocationQuery, Router } from 'vue-router';
import { setCookie } from '@/utils/cookies';
import NProgress from 'nprogress';
import { userStore } from '@/store/modules/user';
import { appStore } from '@/store/modules/app';
const whiteList = ['/login'];

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const userInfo = userStore.userInfo;
    if (userInfo) {
      try {
        if (to.path === '/login') {
          next({ path: '/' });
          NProgress.done();
        } else {
          next();
        }
      } catch (error) {
        userStore.COMMIT_RESETUSERINFO();
        appStore.ChangeLogin(false);
        next(`/login?redirect=${to.path}`);
      }
    } else {
      const { query } = to;
      // cas跳转后设置session和请求用户信息
      if (query.session) {
        setCookie('session', query.session);
        const otherQuery = getOtherQuery(query, 'session');
        await userStore.GetUserInfoAction();
        appStore.ChangeLogin(true);
        router.push({ path: to.path || '/', query: otherQuery });
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
