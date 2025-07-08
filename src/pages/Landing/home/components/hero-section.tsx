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

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function HeroSection({ children }: { children?: ReactNode }) {
  const { toast } = useToast();

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
              SMM Panel <span className="text-yellow-300">#1</span> for Targeted
              No-Drop Services
            </h1>
            <p className="mb-8 text-xl text-blue-100">
              SMM Panel is the provider number #1 in Europe, US and Asia for
              targeted SMM services. Top 10 SMM supplier worldwide!
            </p>
            <div className="mb-8 flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-300">🇮🇹</span>
                <span>Italy</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-300">🇩🇪</span>
                <span>Germany</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-300">🇪🇸</span>
                <span>Spain</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-300">🇺🇸</span>
                <span>USA</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-300">🇯🇵</span>
                <span>Japan</span>
              </div>
            </div>
            <Button className="bg-white px-8 py-4 text-lg font-semibold text-primary hover:bg-gray-100">
              Get Started Now 🚀
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
