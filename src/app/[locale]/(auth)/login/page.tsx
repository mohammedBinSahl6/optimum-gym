"use client";

import React, { useState } from "react";
import Image from "next/image";
import { z } from "zod";
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
import formSchema from "@/lib/zod/login";
import { toast } from "sonner";
import { Link, redirect } from "@/routes";
import { getFormItems } from "@/lib/forms/login";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
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
      redirect({ href: "/dashboard", locale: "en" });
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-light">
      <div className="w-full max-w-md flex flex-col items-center justify-center gap-4 p-4 rounded-xl bg-white">
        <Image
          src="/assets/logo.svg"
          alt="Optimum Gym Logo"
          width={200}
          height={200}
        />
        <h2 className="text-3xl font-bold text-center">{t("Title")}</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-3"
          >
            {formItems.map((item) => (
              <FormField
                key={item.name}
                control={form.control}
                name={item.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={item.placeholder}
                        {...field}
                        type={item.type}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button type="submit" disabled={loading} loading={loading}>
              {t("Submit")}
            </Button>
          </form>
        </Form>
        <p>
          {t("DontHaveAnAccount")}
          <Link className="text-primary-red" href="/register">
            {t("Register")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
