import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n.use(Backend).use(detector).use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  debug: true,
  returnObjects: true,
});

export default i18n;
