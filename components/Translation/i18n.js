import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import globalEn from './dict/en/global.json';
import countriesEn from './dict/en/countries.json';
import graphicsEn from './dict/en/graphics.json';
import homeEn from './dict/en/home.json';

import globalRu from './dict/ru/global.json';
import countriesRu from './dict/ru/countries.json'
import graphicsRu from './dict/ru/graphics.json';
import homeRu from './dict/ru/home.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        global: globalEn,
        countries: countriesEn,
        graphics: graphicsEn,
        home: homeEn
      },
      ru: {
        global: globalRu,
        countries: countriesRu,
        graphics: graphicsRu,
        home: homeRu
      }
    },
    fallbackLng: 'en',
    preload: true,
    debug: true,
    ns: ["global", "countries", "graphics", "home"],
    defaultNS: "global",

    keySeparator: false,

    interpolation: {
      escapeValue: false
    },
    defaultNS: "global"
  })

  export default i18n