import { Module, VuexModule, getModule, Mutation } from 'vuex-module-decorators';
import store from '@/store';

@Module({ dynamic: true, namespaced: true, store, name: 'app' })
export default class App extends VuexModule {
  public isLogin = false;
  public siderbarCollapsed = false;
  public device = '';
  @Mutation
  toggleLogin(isLogin: boolean): void {
    this.isLogin = isLogin;
  }
  @Mutation
  toggleSiderbarCollapsed(siderbarCollapsed: boolean): void {
    this.siderbarCollapsed = siderbarCollapsed;
  }
  @Mutation
  changeDevice(device: string): void {
    this.device = device;
  }
}
export const appStore = getModule<App>(App);
