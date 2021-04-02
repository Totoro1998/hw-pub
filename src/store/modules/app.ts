import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store';

@Module({
  dynamic: true,
  namespaced: true,
  store,
  name: 'app',
  preserveState: localStorage.getItem('vuex') !== null,
})
export default class App extends VuexModule {
  public isLogin = false;
  public sidebarCollapsed = false;
  public device = '';
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
  @Action
  ChangeLogin(isLogin: boolean) {
    this.TOGGLE_LOGIN(isLogin);
  }
  @Action
  ToggleSidebarCollapsed(sidebarCollapsed: boolean) {
    this.TOGGLE_SIDEBAR_COLLAPSED(sidebarCollapsed);
  }
  @Action
  ChangeDevice(device: string) {
    this.CHANGE_DEVICE(device);
  }
}
export const appStore = getModule<App>(App);
