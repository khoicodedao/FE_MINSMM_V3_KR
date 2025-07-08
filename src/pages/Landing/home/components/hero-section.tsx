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
import { useToast } from "../hooks/use-toast";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function HeroSection() {
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
              Urpanel SMM Panel is the provider number #1 in Europe, US and Asia
              for targeted SMM services. Top 10 SMM supplier worldwide!
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

          <div className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
            <h3 className="mb-6 text-center text-2xl font-semibold">
              Sign In to Your Account
            </h3>
            <Form {...form}>
              <form
                // @ts-ignore
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  // @ts-ignore
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your username"
                          className="border-white/30 bg-white/20 text-white placeholder-white/70 focus:ring-white/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  // @ts-ignore
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter your password"
                          className="border-white/30 bg-white/20 text-white placeholder-white/70 focus:ring-white/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <FormField
                    // @ts-ignore
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm text-white">
                          Remember me
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <Button
                    variant="link"
                    className="p-0 text-sm text-yellow-300 hover:text-yellow-200"
                  >
                    Forgot password?
                  </Button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-yellow-400 py-3 font-semibold text-blue-900 hover:bg-yellow-300"
                >
                  Sign In
                </Button>

                <p className="text-center text-sm">
                  Don't have an account?{" "}
                  <Button
                    variant="link"
                    className="p-0 text-yellow-300 hover:text-yellow-200"
                  >
                    Sign up
                  </Button>
                </p>
              </form>
            </Form>
          </div>
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
