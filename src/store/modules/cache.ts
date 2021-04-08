import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store';
import { IUserInfo } from '../types';
import { getUserInfo } from '@/api/user';

@Module({
  dynamic: true,
  namespaced: true,
  store,
  name: 'cache',
  preserveState: localStorage.getItem('vuex') !== null,
})
export default class Cache extends VuexModule {
  public isLogin = false;
  public sidebarCollapsed = false;
  public device = '';
  public pageLoading = true;
  public userInfo: IUserInfo | null = null;
  @Mutation
  CHANGE_PAGE_LOADING(loading: boolean): void {
    this.pageLoading = loading;
  }
  @Mutation
  TOGGLE_LOGIN(isLogin: boolean): void {
    this.isLogin = isLogin;
  }
  @Mutation
  TOGGLE_SIDEBAR_COLLAPSED(sidebarCollapsed: boolean): void {
    this.sidebarCollapsed = sidebarCollapsed;
  }
  @Mutation
  CHANGE_DEVICE(device: string): void {
    this.device = device;
  }
  @Mutation
  COMMIT_USERINFO(userInfo: IUserInfo): void {
    this.userInfo = userInfo;
  }
  @Mutation
  COMMIT_RESETUSERINFO(): void {
    this.userInfo = null;
  }
  @Action
  async GetUserInfoAction() {
    const userInfo = await getUserInfo();
    await this.COMMIT_USERINFO(userInfo);
  }
}
export const cacheStore = getModule<Cache>(Cache);
