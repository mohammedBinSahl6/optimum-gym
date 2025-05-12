"use client";

import React from "react";

import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";

import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import formSchema from "@/lib/zod/blog";
import { User } from "@prisma/client";

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
import RichTextArea from "@/components/richtextarea/RichTextArea";
import UploadField from "@/components/upload-field/UploadField";

import { useBlogForm } from "@/app/context/BlogFormContext";

interface BlogDrawerProps {
  user: User;
  loading: boolean;
  userBlogCount: number;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
}

const BlogDrawer: React.FC<BlogDrawerProps> = ({
  user,
  loading,
  userBlogCount,
  onSubmit,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", subtitle: "", content: "", image: "" },
  });

  const { richTextValue, setRichTextValue, setUploadedImage } = useBlogForm();

  const t = useTranslations("CmsPage");
  const btn = t("button");
  const createLbl = t("createblog");
  const forLbl = t("for");

  const labels = {
    title: t("title"),
    subtitle: t("subtitle"),
    content: t("content"),
    image: t("image"),
  } as const;

  const inputs = (["title", "subtitle", "content", "image"] as const).map(
    (key) => ({
      name: key,
      label: labels[key],
      type: key === "content" ? "richText" : key === "image" ? "file" : "text",
      placeholder: `Enter ${labels[key]}`,
    })
  );

  const { data } = useSession();
  const fullName = data?.user?.fullName ?? "";

  return (
    <section className="relative w-full md:w-2/3">
      <h1 className="text-7xl text-center font-bold">CMS</h1>

      <Drawer>
        <DrawerTrigger asChild>
          <div className="flex flex-row-reverse items-center justify-between w-full p-8">
            <Button variant="blue">{btn}</Button>
            <h1 className="text-4xl">{t("slidersAndSessions")}</h1>
          </div>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              {createLbl} {forLbl} {user.firstName}
            </DrawerTitle>
          </DrawerHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-3 md:max-w-full p-10 relative"
            >
              {inputs.map((item) => (
                <FormField
                  key={item.name}
                  control={form.control}
                  name={item.name}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      {item.type !== "file" && (
                        <FormLabel>{item.label}</FormLabel>
                      )}
                      <FormControl>
                        {item.type === "richText" ? (
                          <RichTextArea
                            value={richTextValue}
                            onChange={(val) => {
                              setRichTextValue(val);
                              field.onChange(val);
                            }}
                          />
                        ) : item.type === "file" ? (
                          <UploadField
                            userBlogCount={userBlogCount}
                            userId={user.id}
                            username={fullName}
                            onChange={(url) => {
                              setUploadedImage(url);
                              field.onChange(url);
                            }}
                          />
                        ) : (
                          <Input
                            placeholder={item.placeholder}
                            {...field}
                            type="text"
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <Button
                type="submit"
                disabled={loading}
                loading={loading}
                className="mt-8"
              >
                {createLbl}
              </Button>
            </form>
          </Form>
        </DrawerContent>
      </Drawer>
    </section>
  );
};

export default BlogDrawer;
