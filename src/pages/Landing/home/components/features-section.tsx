import {
  Crown,
  Star,
  Shield,
  DollarSign,
  Rocket,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: Crown,
    title: "Leader in SMM Targeted Services",
    description:
      "We are trusted by thousands of clients worldwide as the #1 SMM Panel Provider of targeted services.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Star,
    title: "High-Quality Social Media Growth",
    description:
      "We offer real, high-quality followers, likes, views, and comments that resonate with your content.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Shield,
    title: "No-Drop, Guaranteed Services",
    description:
      "We offer no-drop services with a guarantee of stability and immediate refill policy.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: DollarSign,
    title: "Cheapest SMM Pricing",
    description:
      "We offer competitive pricing without compromising quality, accessible to everyone.",
    color: "text-green-600",
    bgColor: "bg-green-600/10",
  },
  {
    icon: Rocket,
    title: "Quick and Reliable Delivery",
    description:
      "Fast delivery with results starting almost immediately. Our system works 24/7.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    description:
      "Our dedicated support team is available 24/7 to assist you with any queries or issues.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800">
            Why Choose SMM SMM?
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            SMM is the top choice for SMM Targeted services worldwide, as it's
            the main supplier for Instagram Targeted Followers, Likes and
            comments.
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
