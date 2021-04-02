import { createStore, createLogger } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const persistedConfig = {
  paths: ['app.isLogin', 'user.userInfo'],
};
export default createStore({
  plugins: [createPersistedState(persistedConfig), createLogger()],
});
