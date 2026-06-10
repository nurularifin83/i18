import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./locales/en/en.json";
import idTranslation from "./locales/id/id.json";
import jaTranslation from "./locales/ja/ja.json";

const resources = {
  en: {
    translation: enTranslation,
  },
  id: {
    translation: idTranslation,
  },
  ja: {
    translation: jaTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
