import {
  Rocket,
  Facebook,
  Twitter,
  Instagram,
  MessageCircle,
} from "lucide-react";
// @ts-ignore
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const footerSections = [
    {
      title: t("footer.services.title"),
      links: [
        t("footer.services.instagram"),
        t("footer.services.tiktok"),
        t("footer.services.youtube"),
        t("footer.services.facebook"),
        t("footer.services.twitch"),
        t("footer.services.all"),
      ],
    },
    {
      title: t("footer.company.title"),
      links: [
        t("footer.company.about"),
        t("footer.company.how"),
        t("footer.company.api"),
        t("footer.company.affiliate"),
        t("footer.company.terms"),
        t("footer.company.privacy"),
      ],
    },
    {
      title: t("footer.support.title"),
      links: [
        t("footer.support.contact"),
        t("footer.support.chat"),
        t("footer.support.faq"),
        t("footer.support.ticket"),
        t("footer.support.status"),
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: MessageCircle, href: "#" },
  ];

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
            <p className="mb-6 text-gray-400">{t("footer.description")}</p>
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
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
