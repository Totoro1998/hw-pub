import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store';
import { AppRouteRecordRaw } from '@/types/config';

@Module({
  dynamic: true,
  namespaced: true,
  store,
  name: 'permission',
  preserveState: localStorage.getItem('vuex') !== null,
})
export default class Permission extends VuexModule {
  public routes: AppRouteRecordRaw[] = [];
  @Mutation
  SET_ROTES(routes: AppRouteRecordRaw[]): void {
    this.routes = routes;
  }
  @Action
  GenerateRoutes(roles: string[]) {
    console.log(roles);
    const routes: AppRouteRecordRaw[] = [];
    this.SET_ROTES(routes);
  }
}
export const appStore = getModule<Permission>(Permission);
