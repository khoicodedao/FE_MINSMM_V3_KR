import { Button } from "../components/ui/button";

export default function VideoSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800">
            Need Further Help?
          </h2>
          <h3 className="mb-4 text-2xl font-semibold text-primary">
            Check our SMM Panel Video Guide
          </h3>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            SMM's SMM panel is designed to provide a smooth and straightforward
            experience for anyone looking to enhance their social media
            presence.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.youtube.com/embed/abKh0_Xz-BU?controls=1"
                title="SMM SMM Panel Video Guide"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-96 w-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-2xl font-semibold text-gray-800">
            <strong>SMM</strong> is the <strong>#1 Social Media Panel</strong>{" "}
            in the world! 🌍
          </p>
          <p className="mb-8 text-xl text-gray-600">
            What are you waiting for?
          </p>
          <Button className="bg-primary px-8 py-4 text-lg font-semibold text-white hover:bg-blue-600">
            Get Started Now 🚀
          </Button>
        </div>
      </div>
    </section>
  );
}
