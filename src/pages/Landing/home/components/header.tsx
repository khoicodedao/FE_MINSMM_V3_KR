import { useState } from "react";
import { Button } from "../components/ui/button";
import { Rocket, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Rocket className="text-lg text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">SMM</span>
          </div>

          <div className="hidden items-center space-x-8 md:flex">
            <button
              onClick={() => scrollToSection("services")}
              className="text-gray-600 transition-colors hover:text-primary"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-gray-600 transition-colors hover:text-primary"
            >
              How it Works
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-gray-600 transition-colors hover:text-primary"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection("support")}
              className="text-gray-600 transition-colors hover:text-primary"
            >
              Support
            </button>
          </div>

          <div className="hidden items-center space-x-4 md:flex">
            <Button
              // variant="ghost"
              className="text-gray-600 hover:text-primary"
            >
              Sign In
            </Button>
            <Button className="bg-primary text-white hover:bg-blue-600">
              Sign Up
            </Button>
          </div>

          <Button
            // variant="ghost"
            // size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-4 border-t border-gray-200 pb-4 md:hidden">
            <div className="flex flex-col space-y-4 pt-4">
              <button
                onClick={() => scrollToSection("services")}
                className="text-left text-gray-600 transition-colors hover:text-primary"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-left text-gray-600 transition-colors hover:text-primary"
              >
                How it Works
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-left text-gray-600 transition-colors hover:text-primary"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("support")}
                className="text-left text-gray-600 transition-colors hover:text-primary"
              >
                Support
              </button>
              <div className="flex flex-col space-y-2 pt-2">
                <Button className="justify-start">Sign In</Button>
                <Button className="justify-start bg-primary hover:bg-blue-600">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
