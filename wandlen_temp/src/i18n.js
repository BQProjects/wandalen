import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import en from "./locales/en.json";
import nl from "./locales/nl.json";

const resources = {
  en: {
    translation: en,
  },
  nl: {
    translation: nl,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "nl",
    fallbackLng: "nl",
    debug: true,

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
    },
    react: {
      useSuspense: false,
      bindI18n: "languageChanged loaded",
      bindI18nStore: "added removed",
      transEmptyNodeValue: "",
      transSupportBasicHtmlNodes: true,
      transWrapTextNodes: "",
    },
  });

export default i18n;
