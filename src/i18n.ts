import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        supportedLngs: ['en', 'he', 'pt'],
        debug: false,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
    });

// Handle RTL text direction
i18n.on('languageChanged', (lng) => {
    document.documentElement.setAttribute('dir', lng === 'he' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lng);
});

export default i18n;
