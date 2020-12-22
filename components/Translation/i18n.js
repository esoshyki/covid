import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import globalEn from './dict/en/global.json';
import countriesEn from './dict/en/countries.json';
import graphicsEn from './dict/en/graphics.json';
import homeEn from './dict/en/home.json';
import aboutEn from './dict/en/about.json';

import globalRu from './dict/ru/global.json';
import countriesRu from './dict/ru/countries.json'
import graphicsRu from './dict/ru/graphics.json';
import homeRu from './dict/ru/home.json';
import aboutRu from './dict/ru/about.json'

import globalBe from './dict/be/global.json';
import countriesBe from './dict/be/countries.json'
import graphicsBe from './dict/be/graphics.json';
import homeBe from './dict/be/home.json';
import aboutBe from './dict/be/about.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        global: globalEn,
        countries: countriesEn,
        graphics: graphicsEn,
        home: homeEn,
        about: aboutEn
      },
      ru: {
        global: globalRu,
        countries: countriesRu,
        graphics: graphicsRu,
        home: homeRu,
        about: aboutRu
      },
      be: {
        global: globalBe,
        countries: countriesBe,
        graphics: graphicsBe,
        home: homeBe,
        about: aboutBe
      },     
    },
    fallbackLng: 'en',
    preload: true,
    debug: true,
    ns: ["global", "countries", "graphics", "home", "about"],
    defaultNS: "global",

    keySeparator: false,

    interpolation: {
      escapeValue: false
    },
    defaultNS: "global"
  })

  export default i18n