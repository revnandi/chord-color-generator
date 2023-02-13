import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App)
  .use(Toast, {
    containerClassName: 'toast-container-style-overwrite',
    toastClassName: 'toast-style-overwrite',
    bodyClassName: 'toast-body-style-overwrite',
    iconClassName: 'toast-icon-style-overwrite',
    closeButtonClassName: 'toast-close-style-overwrite',
    maxToasts: 20,
    newestOnTop: true,
    position: 'top-left',
    closeOnClick: true,
    timeout: 3000,
    transition: 'Vue-Toastification__fade',
  })
  .mount('#app');
