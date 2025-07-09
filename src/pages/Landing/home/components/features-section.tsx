import {
  Crown,
  Star,
  Shield,
  DollarSign,
  Rocket,
  Headphones,
} from "lucide-react";
//@ts-ignore
import { useTranslation } from "react-i18next";

export default function FeaturesSection() {
  const { t } = useTranslation(); // ❌ không dùng namespace

  const features = [
    {
      icon: Crown,
      title: t("features.leaderTitle"),
      description: t("features.leaderDesc"),
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Star,
      title: t("features.qualityTitle"),
      description: t("features.qualityDesc"),
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Shield,
      title: t("features.noDropTitle"),
      description: t("features.noDropDesc"),
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: DollarSign,
      title: t("features.cheapestTitle"),
      description: t("features.cheapestDesc"),
      color: "text-green-600",
      bgColor: "bg-green-600/10",
    },
    {
      icon: Rocket,
      title: t("features.quickTitle"),
      description: t("features.quickDesc"),
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Headphones,
      title: t("features.supportTitle"),
      description: t("features.supportDesc"),
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800">
            {t("features.heading")}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            {t("features.subheading")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl"
            >
              <div
                className={`h-16 w-16 ${feature.bgColor} mb-6 flex items-center justify-center rounded-lg`}
              >
                <feature.icon className={`${feature.color} h-8 w-8 text-2xl`} />
              </div>
              <h3 className="mb-4 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
