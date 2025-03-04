'use client'
import Image from "next/image";
import React from "react";
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
import Link from "next/link";

const formItems: Array<{
  label: string;
  name: keyof z.infer<typeof formSchema>;
  type: "text" | "email" | "password";
  placeholder: string;
}> = [
  {
    label: "First Name",
    name: "firstName",
    type: "text",
    placeholder: "First Name",
  },
  {
    label: "Last Name",
    name: "lastName",
    type: "text",
    placeholder: "Last Name",
  },
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
  {
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
  },
];

const RegisterPage = () => {
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
        <h2 className="text-3xl font-bold text-center">Register</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
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
                        <FormLabel className="font-normal">Admin</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="coach" />
                        </FormControl>
                        <FormLabel className="font-normal">Coach</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="member" />
                        </FormControl>
                        <FormLabel className="font-normal">Member</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Register</Button>
          </form>
        </Form>
        <p>Already have an account? <Link className="text-primary-red" href="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default RegisterPage;
