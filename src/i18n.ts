// src/i18n.js
import { createI18n } from 'vue-i18n';
import messages from './locales/messages.json';

const i18n = createI18n({
  legacy: false,
  locale: 'en', // default locale
  fallbackLocale: 'en', // fallback locale
  messages, // set locale messages
});

export default i18n;
