import { createI18n } from 'vue-i18n';
import en_US from '../public/i18n/en_US.json';
import zh_CN from '../public/i18n/zh_CN.json';

const i18n = createI18n({
    locale: 'zh_CN',
    fallbackLocale: 'zh_CN',
    messages: {
        en_US,
        zh_CN,
    },
});

export default i18n;