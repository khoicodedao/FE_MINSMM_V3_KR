import {
  Rocket,
  Facebook,
  Twitter,
  Instagram,
  MessageCircle,
} from "lucide-react";

const footerSections = [
  {
    title: "Services",
    links: [
      "Instagram Panel",
      "TikTok Panel",
      "YouTube Panel",
      "Facebook Panel",
      "Twitch Panel",
      "All Services",
    ],
  },
  {
    title: "Company",
    links: [
      "About Us",
      "How It Works",
      "API Documentation",
      "Affiliate Program",
      "Terms of Service",
      "Privacy Policy",
    ],
  },
  {
    title: "Support",
    links: ["Contact Us", "Live Chat", "FAQ", "Ticket System", "Status Page"],
  },
];

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: MessageCircle, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-16 text-white" id="support">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-6 flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Rocket className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold">SMM</span>
            </div>
            <p className="mb-6 text-gray-400">
              The #1 SMM Panel Provider for targeted social media services
              worldwide.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-primary"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="mb-6 text-lg font-semibold">{section.title}</h4>
              <ul className="space-y-3 text-gray-400">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="transition-colors hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; 2024. All rights reserved. | The #1 SMM Panel Provider
            Worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
