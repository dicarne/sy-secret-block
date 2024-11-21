import { createApp } from 'vue'
import GlobalApp from "./GlobalApp.vue"
import i18n from './i18n';

const app = createApp(GlobalApp)

app.use(i18n);

app.mount('#app')

window.addEventListener('load', (...args) => {
    const userLang = window.parent.siyuan?.config?.lang || 'zh_CN';
    i18n.global.locale = userLang as any;
})