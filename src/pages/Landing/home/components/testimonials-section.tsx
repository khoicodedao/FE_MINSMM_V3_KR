"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Marco R.",
    text: "The service is affordable, and the results are better than expected. Recommended especially for the free initial balance.",
  },
  {
    name: "Devesh Marnan",
    text: "Now I'm able to save much more time (and money!) while expanding my own panel. Thank you!!",
  },
  {
    name: "Sarah K.",
    text: "My Instagram account gained real followers quickly. Very satisfied with the quality and speed.",
  },
  {
    name: "Liam P.",
    text: "Customer support is fast and helpful. The services really helped boost my brand’s visibility.",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 2 < testimonials.length ? prev + 2 : 0));
  };

  const prev = () => {
    setCurrent((prev) => (prev - 2 >= 0 ? prev - 2 : testimonials.length - 2));
  };

  return (
    <section className="bg-white py-24 text-center">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
          What Our Customers Are Saying
        </h2>
        <p className="mx-auto mb-12 max-w-3xl text-gray-600">
          At SMM, we take pride in the success stories of our clients. From
          influencers to small business owners, our customers have experienced
          significant growth in their social media presence by using our
          high-quality SMM services.
        </p>

        <div className="relative flex items-center justify-center gap-4">
          {/* Prev Arrow */}
          <button
            onClick={prev}
            className="text-orange-500 hover:text-orange-600"
          >
            <ChevronLeft size={40} />
          </button>

          {/* Testimonial Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.slice(current, current + 2).map((t, i) => (
              <div
                key={i}
                className="max-w-md rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-md"
              >
                <h4 className="mb-2 text-lg font-semibold text-gray-800">
                  {t.name}
                </h4>
                <p className="text-sm text-gray-600">{t.text}</p>
              </div>
            ))}
          </div>

          {/* Next Arrow */}
          <button
            onClick={next}
            className="text-orange-500 hover:text-orange-600"
          >
            <ChevronRight size={40} />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: Math.ceil(testimonials.length / 2) }).map(
            (_, i) => (
              <span
                key={i}
                onClick={() => setCurrent(i * 2)}
                className={`h-3 w-3 cursor-pointer rounded-full ${
                  current === i * 2 ? "bg-purple-600" : "bg-purple-300"
                }`}
              ></span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
