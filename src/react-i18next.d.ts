import "react-i18next";

declare module "react-i18next" {
  interface CustomTypeOptions {
    // custom namespace type if you have multiple namespaces
    defaultNS: "translation";
    // custom resources type
    resources: {
      translation: typeof import("./locales/en/translation.json");
    };
  }
}
