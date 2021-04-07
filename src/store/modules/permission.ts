import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store';
import { RouteRecordRaw } from 'vue-router';

@Module({
  dynamic: true,
  namespaced: true,
  store,
  name: 'permission',
  preserveState: localStorage.getItem('vuex') !== null,
})
export default class Permission extends VuexModule {
  public routes: RouteRecordRaw[] = [];
  @Mutation
  SET_ROTES(routes: RouteRecordRaw[]): void {
    this.routes = routes;
  }
  @Action
  GenerateRoutes(roles: string[]) {
    const routes: RouteRecordRaw[] = [];
    console.log(roles);
    this.SET_ROTES(routes);
  }
}
export const appStore = getModule<Permission>(Permission);
