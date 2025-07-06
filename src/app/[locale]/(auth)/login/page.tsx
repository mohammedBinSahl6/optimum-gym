"use client";
import { useState } from "react";
import Image from "next/image";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Checkbox } from "@/components/ui/checkbox";
import formSchema from "@/lib/zod/login";
import { toast } from "sonner";
import { Link, redirect } from "@/i18n/routes";
import { getFormItems } from "@/lib/forms/login";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Github,
  Chrome,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const t = useTranslations("LoginPage");
  const formItems = getFormItems(t);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("Welcome back!");
      redirect({ href: "/dashboard", locale: "en" });
    }
    setLoading(false);
  }

  const handleSocialLogin = async (provider: string) => {
    await signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-primary-light/90 to-primary-light/80 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-red/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-red/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left side - Branding and features */}
        <div className="hidden lg:flex flex-col justify-center space-y-8 text-gray-800">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-red/10 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary-red" />
              </div>
              <h1 className="text-4xl font-bold">Welcome Back</h1>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed">
              Access your personalized fitness journey and unlock your potential
              with our comprehensive gym management platform.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: Shield,
                title: "Secure & Private",
                desc: "Your data is protected with enterprise-grade security",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "Optimized performance for seamless user experience",
              },
              {
                icon: Sparkles,
                title: "Smart Features",
                desc: "AI-powered insights to enhance your fitness goals",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30"
              >
                <div className="w-10 h-10 bg-primary-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-primary-red" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-8 pt-8">
              <div className="mx-auto mb-6 relative">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-red to-primary-red/80 rounded-2xl flex items-center justify-center shadow-lg">
                  <Image
                    src="/assets/logo.svg"
                    alt="Optimum Gym Logo"
                    width={40}
                    height={40}
                    className="filter brightness-0 invert"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{t("Title")}</h2>
              <p className="text-gray-600 mt-2">
                Enter your credentials to access your account
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Social Login Buttons */}
              {/* <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("google")}
                  className="h-11 border-gray-200 hover:bg-gray-50"
                >
                  <Chrome className="w-4 h-4 mr-2" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("github")}
                  className="h-11 border-gray-200 hover:bg-gray-50"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              </div>

              <div className="relative">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500">
                    or continue with email
                  </span>
                </div>
              </div> */}

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                              placeholder="Enter your email"
                              {...field}
                              type="email"
                              className="pl-10 h-12 border-gray-200 focus:border-primary-red focus:ring-primary-red/20"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                              placeholder="Enter your password"
                              {...field}
                              type={showPassword ? "text" : "password"}
                              className="pl-10 pr-10 h-12 border-gray-200 focus:border-primary-red focus:ring-primary-red/20"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {/* <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={setRememberMe}
                        className="border-gray-300"
                      /> */}
                      <label
                        htmlFor="remember"
                        className="text-sm text-gray-600 cursor-pointer"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary-red hover:text-primary-red/80 font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-gradient-to-r from-primary-red to-primary-red/90 hover:from-primary-red/90 hover:to-primary-red text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 group"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>{t("Submit")}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>
                </form>
              </Form>

              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-gray-600">
                  {t("DontHaveAnAccount")}{" "}
                  <Link
                    href="/register"
                    className="text-primary-red hover:text-primary-red/80 font-medium"
                  >
                    {t("Register")}
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Trust indicators */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 mb-3">
              Trusted by 10,000+ fitness enthusiasts
            </p>
            <div className="flex justify-center items-center space-x-4 opacity-60">
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span className="text-xs">SSL Secured</span>
              </div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="flex items-center space-x-1">
                <Lock className="w-4 h-4" />
                <span className="text-xs">GDPR Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
