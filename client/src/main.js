import App from './App.vue'
import { createApp } from 'vue'
import router from './router'
import './assets/reset.css';
import './assets/styles.css';

createApp(App)
    .use(router)
    .mount('#app');
