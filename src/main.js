import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index';

import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap 5.2
import 'bootstrap-icons/font/bootstrap-icons.css'

import ToastPlugin from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-sugar.css';
import { createPinia } from 'pinia'

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ToastPlugin);
app.mount('#app');
