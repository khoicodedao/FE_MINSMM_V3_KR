import {
  CreditCard,
  Bitcoin,
  Wallet,
  Banknote,
  University,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
//@ts-ignore
import { useTranslation } from "react-i18next";

export default function PaymentMethodsSection() {
  const { t } = useTranslation();

  const icons = [CreditCard, Wallet, Bitcoin, Wallet, Banknote, University];
  const badgeColors = [
    "bg-green-100 text-green-800",
    "bg-gray-100 text-gray-600",
    "bg-green-100 text-green-800",
    "bg-green-100 text-green-800",
    "bg-green-100 text-green-800",
    "bg-blue-100 text-blue-800",
  ];
  const bgColors = [
    "bg-blue-500/10",
    "bg-yellow-500/10",
    "bg-orange-500/10",
    "bg-purple-500/10",
    "bg-red-500/10",
    "bg-indigo-500/10",
  ];
  const textColors = [
    "text-blue-500",
    "text-yellow-500",
    "text-orange-500",
    "text-purple-500",
    "text-red-500",
    "text-indigo-500",
  ];

  return (
    <section className="py-20" id="pricing">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800">
            {t("paymentSection.heading")}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            {t("paymentSection.subheading")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="rounded-xl bg-white p-6 text-center shadow-lg transition-shadow hover:shadow-xl"
              >
                <div
                  className={`h-16 w-16 ${bgColors[index]} mx-auto mb-4 flex items-center justify-center rounded-lg`}
                >
                  <Icon className={`${textColors[index]} h-8 w-8 text-2xl`} />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  {t(`paymentSection.methods.${index}.title`)}
                </h3>
                <p className="mb-2 text-gray-600">
                  {t(`paymentSection.methods.${index}.description`)}
                </p>
                <Badge className={badgeColors[index]}>
                  {t(`paymentSection.methods.${index}.bonus`)}
                </Badge>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
