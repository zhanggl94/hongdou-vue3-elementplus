/*
 * @Descripttion: 
 * @Version: 
 * @Author: zhanggl
 * @Date: 2021-06-18 21:44:58
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-08 16:41:29
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import initElementPlus from './plugins/elementplus';

const app = createApp(App);
initElementPlus(app);
app.use(store).use(router).mount('#app')
