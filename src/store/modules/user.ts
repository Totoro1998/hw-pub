import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store';
import { IUserInfo } from '../types';

@Module({ dynamic: true, namespaced: true, store, name: 'user' })
export default class User extends VuexModule {
  public userInfo: IUserInfo | null = null;
  @Mutation
  commitUserInfo(userInfo: IUserInfo): void {
    this.userInfo = userInfo;
  }
  @Action
  async getUserInfoAction() {
    // this.commitUserInfo()
  }
}
export const userStore = getModule<User>(User);
