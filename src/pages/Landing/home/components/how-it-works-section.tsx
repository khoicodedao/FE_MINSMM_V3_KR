const steps = [
  {
    number: 1,
    title: "Create an Account",
    description:
      "Sign up for an account on SMM. The registration process is quick and user-friendly.",
  },
  {
    number: 2,
    title: "Deposit Funds",
    description:
      "Add funds to your balance using credit cards, PayPal, cryptocurrencies, and more payment methods.",
  },
  {
    number: 3,
    title: "Select a Service",
    description:
      "Navigate to our service catalog and select the service that best fits your social media needs.",
  },
  {
    number: 4,
    title: "Guaranteed Results",
    description:
      "We deliver high-quality, reliable results with no-drop guarantees and refill options.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-gray-50 py-20" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800">
            How SMM Panel Works?
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            SMM panels are software companies working as intermediaries between
            users and social media platforms.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-white">
                {step.number}
              </div>
              <h3 className="mb-4 text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
