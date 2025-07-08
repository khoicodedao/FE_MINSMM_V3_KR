"use client";

import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What is the purpose of SMM Panel?",
    answer:
      "SMM panels help you grow social media accounts by providing likes, followers, comments, and more at affordable rates.",
  },
  {
    question: "What types of SMM services do you provide?",
    answer:
      "We offer targeted followers, likes, views, comments, and more across platforms like Instagram, TikTok, YouTube, and Facebook.",
  },
  {
    question: "Are Drip-Feed Services Safe for All Platforms?",
    answer:
      "Yes, our drip-feed services are optimized to simulate organic behavior and comply with platform limits.",
  },
  {
    question: "How Do Mass Orders Work?",
    answer:
      "Mass orders allow you to place bulk service orders using a single form, saving time and effort.",
  },
  {
    question: "How Can I Place Orders via API?",
    answer:
      "You can use our documented API to automate orders. It's available in your dashboard after login.",
  },
  {
    question: "How Long Does It Take to See Results?",
    answer:
      "Most services begin within minutes of ordering, but timing may vary based on service type and volume.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="gradient-primary relative overflow-hidden py-8 text-white">
      {/* Top Curve */}

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
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  {isOpen ? (
                    <Minus className="text-primary" size={20} />
                  ) : (
                    <Plus className="text-primary" size={20} />
                  )}
                </div>
                {isOpen && (
                  <p className="mt-4 text-sm text-gray-600">{faq.answer}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <h3 className="mb-2 text-xl font-semibold">Got More Questions?</h3>
          <p className="mx-auto mb-6 max-w-xl text-white/90">
            If you need further help, feel free to contact our 24/7 customer
            support team. We’re here to help!
          </p>
          <button className="rounded-full bg-white px-6 py-3 font-semibold text-primary transition hover:bg-gray-100">
            Get Started Now 🚀
          </button>
        </div>
      </div>
    </section>
  );
}
