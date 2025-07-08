const services = [
  {
    title: "Instagram SMM Panel",
    description:
      "Buy real targeted followers, likes, comments, and views to enhance your Instagram presence.",
    image: "https://storage.perfectcdn.com/567e76/f30k82nsxm8uqebr.png",
    features: [
      "Real targeted followers",
      "High-quality likes & comments",
      "Video views boost",
    ],
  },
  {
    title: "Twitch SMM Panel",
    description:
      "Boost your Twitch channel with real followers, views, and engagement for streamers.",
    image: "https://storage.perfectcdn.com/567e76/xyehx4mxngegznco.png",
    features: [
      "Increase Twitch followers",
      "Boost live stream views",
      "Channel subscriptions",
    ],
  },
  {
    title: "Spotify SMM Panel",
    description:
      "Grow your music career with authentic Spotify plays, followers, and playlist placements.",
    image: "https://storage.perfectcdn.com/567e76/6lta5db1r9d6qsqg.png",
    features: [
      "Increase plays & followers",
      "Playlist placement",
      "Chart positioning",
    ],
  },
  {
    title: "YouTube SMM Panel",
    description:
      "Accelerate your YouTube growth with subscribers, views, and watch time services.",
    image: "https://storage.perfectcdn.com/567e76/q60ejzjl7efcbdc7.png",
    features: [
      "Real subscribers & views",
      "Watch time boost",
      "Monetization support",
    ],
  },
  {
    title: "TikTok SMM Panel",
    description:
      "Viral TikTok growth with real followers, likes, and views to maximize your content reach.",
    image: "https://storage.perfectcdn.com/567e76/yhj8bmyn47fb0qr5.png",
    features: [
      "Real TikTok followers",
      "Viral video views",
      "Engagement boost",
    ],
  },
  {
    title: "Facebook SMM Panel",
    description:
      "Build your Facebook business page with real likes, shares, and targeted engagement.",
    image: "https://storage.perfectcdn.com/567e76/a5su2kaxaulqij2c.png",
    features: ["Page likes & followers", "Post engagement", "Video views"],
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20" id="services">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800">
            Cheap SMM Provider of Targeted Services
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Urpanel offers more than 2000 different services for all social
            platforms, designed to boost your social media presence.
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
