import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import file JSON chứa nội dung dịch
import translationEN from "./locales/en/translation.json";
import translationKR from "./locales/kr/translation.json";

const resources = {
  en: { translation: translationEN },
  kr: { translation: translationKR },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "kr", // Ngôn ngữ mặc định
  fallbackLng: "kr", // Ngôn ngữ dự phòng nếu không tìm thấy bản dịch
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
