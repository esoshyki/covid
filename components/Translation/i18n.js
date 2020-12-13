import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import globalEn from './dict/en/global.json';
import countriesEn from './dict/en/countries.json';
import graphicsEn from './dict/en/graphics.json'

import globalRu from './dict/ru/global.json';
import countriesRu from './dict/ru/countries.json'
import graphicsRu from './dict/ru/graphics.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        global: globalEn,
        countries: countriesEn,
        graphics: graphicsEn
      },
      ru: {
        global: globalRu,
        countries: countriesRu,
        graphics: graphicsRu
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
    },
    defaultNS: "global"
  })

  export default i18n