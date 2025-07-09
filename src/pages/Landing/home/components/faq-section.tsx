"use client";

import { Plus, Minus } from "lucide-react";
import { useState } from "react";
// @ts-ignore
import { useTranslation } from "react-i18next";

export default function FAQSection() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const faqs = t("faq.questions", { returnObjects: true }) as {
    q: string;
    a: string;
  }[];

  return (
    <section className="gradient-primary relative overflow-hidden py-8 text-white">
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl bg-white p-6 text-gray-800 shadow-md transition-all duration-300"
              >
                <div
                  onClick={() => toggleIndex(index)}
                  className="flex cursor-pointer items-center justify-between"
                >
                  <h3 className="text-lg font-semibold">{faq.q}</h3>
                  {isOpen ? (
                    <Minus className="text-primary" size={20} />
                  ) : (
                    <Plus className="text-primary" size={20} />
                  )}
                </div>
                {isOpen && (
                  <p className="mt-4 text-sm text-gray-600">{faq.a}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <h3 className="mb-2 text-xl font-semibold">{t("faq.title")}</h3>
          <p className="mx-auto mb-6 max-w-xl text-white/90">
            {t("faq.description")}
          </p>
          <button className="rounded-full bg-white px-6 py-3 font-semibold text-primary transition hover:bg-gray-100">
            {t("faq.button")}
          </button>
        </div>
      </div>
    </section>
  );
}
