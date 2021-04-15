import { createStore, createLogger } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const persistedConfig = {
  key: 'hwCache',
  paths: ['cache.pageLoading', 'cache.userInfo', 'cache.isLogin'],
};
export default createStore({
  plugins: [createPersistedState(persistedConfig), createLogger()],
});
