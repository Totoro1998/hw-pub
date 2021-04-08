import { Module, VuexModule, getModule } from 'vuex-module-decorators';
import store from '@/store';

@Module({
  dynamic: true,
  namespaced: true,
  store,
  name: 'user',
})
export default class User extends VuexModule {}
export const userStore = getModule<User>(User);
