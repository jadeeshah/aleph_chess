import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ar from './locales/ar.json'
import ur from './locales/ur.json'
import fa from './locales/fa.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: ar },
      ur: { translation: ur },
      fa: { translation: fa },
    },
    lng: 'ar', // default language
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  })

export default i18n
