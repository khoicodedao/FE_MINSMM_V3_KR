import { Rocket, Facebook, Twitter, Instagram, MessageCircle } from "lucide-react";

const footerSections = [
  {
    title: "Services",
    links: [
      "Instagram Panel",
      "TikTok Panel", 
      "YouTube Panel",
      "Facebook Panel",
      "Twitch Panel",
      "All Services"
    ]
  },
  {
    title: "Company",
    links: [
      "About Us",
      "How It Works",
      "API Documentation", 
      "Affiliate Program",
      "Terms of Service",
      "Privacy Policy"
    ]
  },
  {
    title: "Support",
    links: [
      "Contact Us",
      "Live Chat",
      "FAQ",
      "Ticket System",
      "Status Page"
    ]
  }
];

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: MessageCircle, href: "#" }
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16" id="support">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Rocket className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-bold">Urpanel</span>
            </div>
            <p className="text-gray-400 mb-6">
              The #1 SMM Panel Provider for targeted social media services worldwide.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-6">{section.title}</h4>
              <ul className="space-y-3 text-gray-400">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Urpanel. All rights reserved. | The #1 SMM Panel Provider Worldwide</p>
        </div>
      </div>
    </footer>
  );
}
