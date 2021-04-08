import { createStore, createLogger } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const persistedConfig = {
  paths: ['cache.pageLoading', 'cache.userInfo', 'isLogin'],
};
export default createStore({
  plugins: [createPersistedState(persistedConfig), createLogger()],
});
