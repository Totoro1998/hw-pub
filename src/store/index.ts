import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const persistedConfig = {
  reducer: (state: any) => {
    return {
      userInfo: state.userInfo,
    };
  },
};
export default createStore({
  plugins: [createPersistedState(persistedConfig)],
});
