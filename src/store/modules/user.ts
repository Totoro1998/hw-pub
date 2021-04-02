import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store';
import { IUserInfo } from '../types';
import { getUserInfo } from '@/api/user';

@Module({
  dynamic: true,
  namespaced: true,
  store,
  name: 'user',
  preserveState: localStorage.getItem('vuex') !== null,
})
export default class User extends VuexModule {
  public userInfo: IUserInfo | null = null;
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
export const userStore = getModule<User>(User);
