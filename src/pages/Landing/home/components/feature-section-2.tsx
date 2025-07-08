import { Megaphone, DollarSign, Target, MessageCircle } from "lucide-react";

export default function FeatureSection() {
  const features = [
    {
      icon: Megaphone,
      title: "#1 SMM Panel Provider",
      description:
        "When it comes to SMM platforms, SMM is easily in the top ten targeted service providers worldwide.",
      color: "from-pink-500 to-red-500",
    },
    {
      icon: DollarSign,
      title: "Cheapest SMM Panel",
      description:
        "SMM offers authentic services at industry-low prices. Cheap prices but with the quality insurance.",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      icon: Target,
      title: "SMM Targeted Services",
      description:
        "On SMM, you will discover the best targeted SMM services available for Instagram and others SM.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: MessageCircle,
      title: "24/7 Customer Service",
      description:
        "SMM's customer service is available 24 hours a day, seven days a week.",
      color: "from-green-400 to-teal-500",
    },
  ];

  return (
    <section className="section-with-top-curve">
      <svg
        className="relative bottom-0 left-0 h-[100px] w-full"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path d="M0,0 C360,80 1080,20 1440,100 L1440,0 L0,0 Z" fill="#ffffff" />
      </svg>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="rounded-xl bg-white p-6 text-center text-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            <div
              className={`h-14 w-14 bg-gradient-to-r ${feature.color} mx-auto mb-4 flex items-center justify-center rounded-full text-white shadow-md`}
            >
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
