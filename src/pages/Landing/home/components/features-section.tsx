import { Crown, Star, Shield, DollarSign, Rocket, Headphones } from "lucide-react";

const features = [
  {
    icon: Crown,
    title: "Leader in SMM Targeted Services",
    description: "We are trusted by thousands of clients worldwide as the #1 SMM Panel Provider of targeted services.",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Star,
    title: "High-Quality Social Media Growth",
    description: "We offer real, high-quality followers, likes, views, and comments that resonate with your content.",
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    icon: Shield,
    title: "No-Drop, Guaranteed Services",
    description: "We offer no-drop services with a guarantee of stability and immediate refill policy.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10"
  },
  {
    icon: DollarSign,
    title: "Cheapest SMM Pricing",
    description: "We offer competitive pricing without compromising quality, accessible to everyone.",
    color: "text-green-600",
    bgColor: "bg-green-600/10"
  },
  {
    icon: Rocket,
    title: "Quick and Reliable Delivery",
    description: "Fast delivery with results starting almost immediately. Our system works 24/7.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    description: "Our dedicated support team is available 24/7 to assist you with any queries or issues.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10"
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Urpanel SMM?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Urpanel is the top choice for SMM Targeted services worldwide, as it's the main supplier for Instagram Targeted Followers, Likes and comments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className={`w-16 h-16 ${feature.bgColor} rounded-lg flex items-center justify-center mb-6`}>
                <feature.icon className={`${feature.color} text-2xl w-8 h-8`} />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
