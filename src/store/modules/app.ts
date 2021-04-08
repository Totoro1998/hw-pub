import { Module, VuexModule, getModule } from 'vuex-module-decorators';
import store from '@/store';

@Module({
  dynamic: true,
  namespaced: true,
  store,
  name: 'app',
})
export default class App extends VuexModule {}
export const appStore = getModule<App>(App);
