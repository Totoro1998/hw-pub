import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import store from './store';
import '@/router/guard';
import { registerUI } from './plugins/ui';
import animate from 'animate.css';
import './style/index.less';
import { setupGlobDirectives } from './directives';
const app = createApp(App);
registerUI(app);
setupRouter(app);
setupGlobDirectives(app);
app.use(animate);
app.use(store);
app.mount('#app');
