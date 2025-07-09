import { Button } from "../components/ui/button";
// @ts-ignore
import { useTranslation } from "react-i18next";

export default function CTASection() {
  const { t } = useTranslation();

  return (
    <section className="gradient-primary relative overflow-hidden py-20 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-4 text-4xl font-bold">{t("ctaSection.heading")}</h2>
        <p className="mx-auto mb-8 max-w-2xl text-xl">
          {t("ctaSection.subheading")}
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button className="bg-white px-8 py-4 text-lg font-semibold text-primary hover:bg-gray-100">
            {t("ctaSection.register")}
          </Button>
          <Button className="border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white hover:bg-white hover:text-primary">
            {t("ctaSection.viewServices")}
          </Button>
        </div>
      </div>

      {/* SVG Curve Bottom */}
      <svg
        className="absolute left-0 h-[100px] w-full"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        style={{ top: "-51px" }}
      >
        <path d="M0,0 C360,80 1080,20 1440,100 L1440,0 L0,0 Z" fill="#ffffff" />
      </svg>
    </section>
  );
}
