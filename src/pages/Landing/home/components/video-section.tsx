import { Button } from "../components/ui/button";
// @ts-ignore
import { useTranslation } from "react-i18next";

export default function VideoSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800">
            {t("videoSection.heading")}
          </h2>
          <h3 className="mb-4 text-2xl font-semibold text-primary">
            {t("videoSection.subheading")}
          </h3>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            {t("videoSection.description")}
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.youtube.com/embed/abKh0_Xz-BU?controls=1"
                title="SMM Panel Video Guide"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-96 w-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-2xl font-semibold text-gray-800">
            <strong>SMM</strong> {t("videoSection.footer1")}
          </p>
          <p className="mb-8 text-xl text-gray-600">
            {t("videoSection.footer2")}
          </p>
          <Button className="bg-primary px-8 py-4 text-lg font-semibold text-white hover:bg-blue-600">
            {t("videoSection.button")}
          </Button>
        </div>
      </div>
    </section>
  );
}
