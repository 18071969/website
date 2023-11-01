/*const path = require('path');*/
//import en from '/locales/en';
//import bg from "./public/locales/bg";

/*const resources = {
    en: {
      translation: en
    },
    bg: {
      translation: bg
    }
  };*/

module.exports = {
    i18n: {
        //resources,
        locales: ["en", "bg", "ru"],
        defaultLocale: "en",
        //localePath: path.resolve('./public/locales'), 
        //debug: true,
    },
  }