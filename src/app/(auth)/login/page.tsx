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
import formSchema from "@/lib/zod/login";
import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

const formItems: Array<{
  label: string;
  name: keyof z.infer<typeof formSchema>;
  type: "text" | "email" | "password";
  placeholder: string;
}> = [
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Email",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Password",
  },
];

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
      redirect("/");
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
        <h2 className="text-3xl font-bold text-center">Login</h2>
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
              Login
            </Button>
          </form>
        </Form>
        <p>
        Dont have an account?{" "}
          <Link className="text-primary-red" href="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
