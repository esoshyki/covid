import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import globalEn from './dict/en/global.json'

import globalRu from './dict/ru/global.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        global: globalEn
      },
      ru: {
        global: globalRu
      }
    },
    fallbackLng: 'en',
    preload: true,
    debug: true,
    ns: ["global"],
    defaultNS: "global",

    keySeparator: false,

    interpolation: {
      escapeValue: false
    }
  })

  export default i18n