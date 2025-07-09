//@ts-ignore
import { useTranslation } from "react-i18next";

export default function ServicesSection() {
  const { t } = useTranslation();

  const services = [
    {
      title: t("services.instagram.title"),
      description: t("services.instagram.description"),
      image: "https://storage.perfectcdn.com/567e76/f30k82nsxm8uqebr.png",
      features: [
        t("services.instagram.features.0"),
        t("services.instagram.features.1"),
        t("services.instagram.features.2"),
      ],
    },
    {
      title: t("services.twitch.title"),
      description: t("services.twitch.description"),
      image: "https://storage.perfectcdn.com/567e76/xyehx4mxngegznco.png",
      features: [
        t("services.twitch.features.0"),
        t("services.twitch.features.1"),
        t("services.twitch.features.2"),
      ],
    },
    {
      title: t("services.spotify.title"),
      description: t("services.spotify.description"),
      image: "https://storage.perfectcdn.com/567e76/6lta5db1r9d6qsqg.png",
      features: [
        t("services.spotify.features.0"),
        t("services.spotify.features.1"),
        t("services.spotify.features.2"),
      ],
    },
    {
      title: t("services.youtube.title"),
      description: t("services.youtube.description"),
      image: "https://storage.perfectcdn.com/567e76/q60ejzjl7efcbdc7.png",
      features: [
        t("services.youtube.features.0"),
        t("services.youtube.features.1"),
        t("services.youtube.features.2"),
      ],
    },
    {
      title: t("services.tiktok.title"),
      description: t("services.tiktok.description"),
      image: "https://storage.perfectcdn.com/567e76/yhj8bmyn47fb0qr5.png",
      features: [
        t("services.tiktok.features.0"),
        t("services.tiktok.features.1"),
        t("services.tiktok.features.2"),
      ],
    },
    {
      title: t("services.facebook.title"),
      description: t("services.facebook.description"),
      image: "https://storage.perfectcdn.com/567e76/a5su2kaxaulqij2c.png",
      features: [
        t("services.facebook.features.0"),
        t("services.facebook.features.1"),
        t("services.facebook.features.2"),
      ],
    },
  ];

  return (
    <section className="py-20" id="services">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800">
            {t("services.heading")}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            {t("services.subheading")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl"
            >
              <img
                src={service.image}
                alt={service.title}
                className="mb-6 w-full rounded-lg object-cover"
              />
              <h3 className="mb-4 text-xl font-semibold">{service.title}</h3>
              <p className="mb-4 text-gray-600">{service.description}</p>
              <ul className="space-y-2 text-sm text-gray-500">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>• {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
