import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import i18n from './plugins/i18n';
import es from './i18n/locales/es.json';

import './assets/main.css';

const app = createApp(App);

app.use(i18n, es);
app.use(createPinia());
app.use(router);

app.mount('#app');
