import {
  CreditCard,
  Bitcoin,
  Wallet,
  Banknote,
  University,
} from "lucide-react";
import { Badge } from "../components/ui/badge";

const paymentMethods = [
  {
    icon: CreditCard,
    title: "Credit & Debit Cards",
    description: "Visa, Mastercard, American Express",
    bonus: "1% Bonus",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    badgeColor: "bg-green-100 text-green-800",
  },
  {
    icon: Wallet,
    title: "PayPal",
    description: "For trusted users only",
    bonus: "No Bonus",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    badgeColor: "bg-gray-100 text-gray-600",
  },
  {
    icon: Bitcoin,
    title: "Cryptocurrencies",
    description: "Bitcoin, Ethereum, USDT, Litecoin",
    bonus: "3% Bonus",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    badgeColor: "bg-green-100 text-green-800",
  },
  {
    icon: Wallet,
    title: "Payeer",
    description: "Fast e-wallet system",
    bonus: "3% Bonus",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    badgeColor: "bg-green-100 text-green-800",
  },
  {
    icon: Banknote,
    title: "Perfect Money",
    description: "International transactions",
    bonus: "2% Bonus",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    badgeColor: "bg-green-100 text-green-800",
  },
  {
    icon: University,
    title: "Other Methods",
    description: "Bank, Alipay, WeChat Pay",
    bonus: "Contact Us",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    badgeColor: "bg-blue-100 text-blue-800",
  },
];

export default function PaymentMethodsSection() {
  return (
    <section className="py-20" id="pricing">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800">
            Flexible and Secure Payment Methods
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            We offer various payment methods with bonus rewards to ensure
            convenient and secure transactions.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {paymentMethods.map((method, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-6 text-center shadow-lg transition-shadow hover:shadow-xl"
            >
              <div
                className={`h-16 w-16 ${method.bgColor} mx-auto mb-4 flex items-center justify-center rounded-lg`}
              >
                <method.icon className={`${method.color} h-8 w-8 text-2xl`} />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{method.title}</h3>
              <p className="mb-2 text-gray-600">{method.description}</p>
              <Badge className={method.badgeColor}>{method.bonus}</Badge>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
