import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en/translation.json';
import esTranslations from './locales/es/translation.json';

const syncHtmlLang = () => {
  const lng = i18n.resolvedLanguage ?? i18n.language;
  if (typeof document === 'undefined' || !lng) return;
  document.documentElement.lang = lng.split('-')[0];
};

i18n.on('languageChanged', syncHtmlLang);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      es: {
        translation: esTranslations,
      },
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })
  .then(syncHtmlLang);

export default i18n;
