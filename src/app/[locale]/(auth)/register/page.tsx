"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import formSchema from "@/lib/zod/register";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from "@/i18n/routes";
import createUser from "@/app/actions/createUser";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import { getFormItems } from "@/lib/forms/register";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "member",
    },
  });

  const t = useTranslations("RegisterPage");
  const formItems = getFormItems(t);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const response = await createUser(values);
    if (response.status === 200) {
      toast(t("SuccessMessage"));
      redirect("/en/login");
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-blue">
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
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3 my-5">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center gap-6 justify-around"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="admin" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t("AdminOption")}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="coach" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t("CoachOption")}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="member" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t("MemberOption")}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} loading={loading}>
              {t("Submit")}
            </Button>
          </form>
        </Form>
        <p>
          {t("AlreadyHaveAnAccount")}
          <Link className="text-primary-red" href="/login">
            {t("Login")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
