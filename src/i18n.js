import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import file JSON chứa nội dung dịch
import translationEN from "./locales/en/translation.json";
import translationTH from "./locales/th/translation.json";

const resources = {
  en: { translation: translationEN },
  th: { translation: translationTH },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Ngôn ngữ mặc định
  fallbackLng: "en", // Ngôn ngữ dự phòng nếu không tìm thấy bản dịch
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
