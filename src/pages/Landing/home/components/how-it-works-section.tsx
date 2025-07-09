//@ts-ignore
import { useTranslation } from "react-i18next";

export default function HowItWorksSection() {
  const { t } = useTranslation();

  const steps = [
    {
      number: 1,
      title: t("howItWorks.steps.1.title"),
      description: t("howItWorks.steps.1.desc"),
    },
    {
      number: 2,
      title: t("howItWorks.steps.2.title"),
      description: t("howItWorks.steps.2.desc"),
    },
    {
      number: 3,
      title: t("howItWorks.steps.3.title"),
      description: t("howItWorks.steps.3.desc"),
    },
    {
      number: 4,
      title: t("howItWorks.steps.4.title"),
      description: t("howItWorks.steps.4.desc"),
    },
  ];

  return (
    <section className="bg-gray-50 py-20" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800">
            {t("howItWorks.heading")}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            {t("howItWorks.subheading")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-white">
                {step.number}
              </div>
              <h3 className="mb-4 text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
