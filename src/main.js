import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import initElementPlus from './plugins/elementplus';

const app = createApp(App);
initElementPlus(app);
app.use(store).use(router).mount('#app')
