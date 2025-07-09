import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { ReactNode } from "react";
import { useToast } from "../hooks/use-toast";
// @ts-ignore
import { useTranslation } from "react-i18next";
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function HeroSection({ children }: { children?: ReactNode }) {
  const { toast } = useToast();
  const { t } = useTranslation();
  const form = useForm<LoginForm>({
    // @ts-ignore
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginForm) => {
    toast({
      title: "Login Attempted",
      description: `Username: ${data.username}, Remember: ${data.rememberMe}`,
    });
  };

  return (
    <section className="gradient-hero text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="mb-6 text-5xl font-bold leading-tight">
              {t("hero.title")}
            </h1>
            <p className="mb-8 text-xl text-blue-100">
              {t("hero.description")}
            </p>
            <div className="mb-8 flex flex-wrap gap-4">
              {[
                { flag: "🇮🇹", key: "italy" },
                { flag: "🇩🇪", key: "germany" },
                { flag: "🇪🇸", key: "spain" },
                { flag: "🇺🇸", key: "usa" },
                { flag: "🇯🇵", key: "japan" },
              ].map((country) => (
                <div key={country.key} className="flex items-center space-x-2">
                  <span className="text-yellow-300">{country.flag}</span>
                  <span>{t(`hero.countries.${country.key}`)}</span>
                </div>
              ))}
            </div>
            <Button className="bg-white px-8 py-4 text-lg font-semibold text-primary hover:bg-gray-100">
              {t("hero.cta")}
            </Button>
          </div>

          {children}
        </div>
      </div>
      <svg
        className="relative bottom-0 left-0 h-[100px] w-full rotate-180"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path d="M0,0 C360,80 1080,20 1440,100 L1440,0 L0,0 Z" fill="#ffffff" />
      </svg>
    </section>
  );
}
