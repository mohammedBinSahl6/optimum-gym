"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import formSchema from "@/lib/zod/blog";
import { useTranslations } from "next-intl";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
import RichTextArea from "./RichTextArea";
interface inputFields {
  label: string;
  name: keyof z.infer<typeof formSchema>;
  type: "text" | "richText";
  placeholder: string;
}

interface MembershipDrawerProps {
  user: User;
  loading: boolean;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

const BlogDrawer = ({
  user,
  loading,

  onSubmit,
}: MembershipDrawerProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      subtitle: "",
      title: "",
    },
  });

  const t = useTranslations("CmsPage");
  const button = t("button");
  const createBlog = t("createblog");
  const f = t("for");
  const translatedTexts = {
    title: t("title"),
    subtitle: t("subtitle"),
    content: t("content"),
  };

  const inputs: inputFields[] = Object.keys(translatedTexts).map((key) => ({
    label: translatedTexts[key as keyof typeof translatedTexts],
    name: key as keyof z.infer<typeof formSchema>,
    type: key === "content" ? "richText" : "text",
    placeholder: `Enter ${
      translatedTexts[key as keyof typeof translatedTexts]
    }`,
  }));

  const formItems: Array<inputFields> = inputs;

  return (
    <section className="relative  w-full md:w-2/3 ">
      <h1 className=" text-7xl text-center font-bold">CMS</h1>
      <Drawer>
        <DrawerTrigger asChild>
          <div className="flex flex-row-reverse items-center justify-between w-full p-8">
            <Button variant="blue" className=" ">
              {button}
            </Button>
            <h1 className=" text-4xl">Sliders and sessions</h1>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              {createBlog} {f} {user.firstName}
            </DrawerTitle>
          </DrawerHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-3 max-w-sm md:max-w-full p-10"
            >
              {formItems.map((item) => (
                <FormField
                  key={item.name}
                  control={form.control}
                  name={item.name}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>{item.label}</FormLabel>
                      {item.type === "richText" ? (
                        <FormControl>
                          <RichTextArea />
                        </FormControl>
                      ) : (
                        <FormControl>
                          <Input
                            placeholder={item.placeholder}
                            {...field}
                            type={item.type as "text"}
                            value={field.value as string}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                      )}

                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <Button type="submit" disabled={loading} loading={loading}>
                {createBlog}
              </Button>
            </form>
          </Form>
        </DrawerContent>
      </Drawer>
    </section>
  );
};

export default BlogDrawer;
