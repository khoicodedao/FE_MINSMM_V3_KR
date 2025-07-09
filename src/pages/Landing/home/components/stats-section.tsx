import { useRef } from "react";
import { useCounterAnimation } from "../hooks/use-counter-animation";
import { Cog, ShoppingCart, Users } from "lucide-react";
// @ts-ignore
import { useTranslation } from "react-i18next";

export default function StatsSection() {
  const { t } = useTranslation();

  const totalServicesRef = useRef<HTMLDivElement>(null);
  const ordersTodayRef = useRef<HTMLDivElement>(null);
  const usersTodayRef = useRef<HTMLDivElement>(null);

  const totalServices = useCounterAnimation(totalServicesRef, 2394, 2000);
  const ordersToday = useCounterAnimation(ordersTodayRef, 1403334, 3000);
  const usersToday = useCounterAnimation(usersTodayRef, 11613, 2500);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-24 md:grid-cols-3">
          {/* Card 1 */}
          <div className="flex h-full items-center justify-center gap-4 rounded-2xl border border-gray-200 p-6 shadow-md">
            <Cog className="text-[#EA256D]" size={40} />
            <div>
              <div
                ref={totalServicesRef}
                className="counter-animate text-3xl font-bold text-[#EA256D]"
              >
                {totalServices.toLocaleString()}
              </div>
              <div className="text-gray-600">{t("stats.totalServices")}</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex h-full items-center justify-center gap-4 rounded-2xl border border-gray-200 p-6 shadow-md">
            <ShoppingCart className="text-[#EA256D]" size={40} />
            <div>
              <div
                ref={ordersTodayRef}
                className="counter-animate text-3xl font-bold text-[#EA256D]"
              >
                {ordersToday.toLocaleString()}
              </div>
              <div className="text-gray-600">{t("stats.ordersToday")}</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex h-full items-center justify-center gap-4 rounded-2xl border border-gray-200 p-6 shadow-md">
            <Users className="text-[#EA256D]" size={40} />
            <div>
              <div
                ref={usersTodayRef}
                className="counter-animate text-3xl font-bold text-[#EA256D]"
              >
                {usersToday.toLocaleString()}
              </div>
              <div className="text-gray-600">{t("stats.usersToday")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
