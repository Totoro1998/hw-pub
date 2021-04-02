import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/router/guard';
import { registerUI } from './plugins/ui';
import 'ant-design-vue/dist/antd.css';
import './style/index.less';

const app = createApp(App);
registerUI(app);
app.use(store);
app.use(router);
app.mount('#app');