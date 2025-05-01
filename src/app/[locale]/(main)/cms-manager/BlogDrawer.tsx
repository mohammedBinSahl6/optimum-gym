"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import formSchema from "@/lib/zod/blog";
import DatePickerForm from "@/components/date-picker/DatePicker";

import { User } from "@prisma/client";

const formItems: Array<{
  label: string;
  name: keyof z.infer<typeof formSchema>;
  type: "text" | "date";
  placeholder: string;
}> = [
  {
    label: "Title",
    name: "title",
    type: "text",
    placeholder: "Title",
  },
  {
    label: "Subtitle",
    name: "subtitle",
    type: "text",
    placeholder: "Subtitle",
  },
  {
    label: "contnet",
    name: "content",
    type: "text",
    placeholder: "Content",
  },
];
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

  return (
    <section>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="blue" className="float-right">
            Add A post
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create a Blog for {user.firstName}</DrawerTitle>
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
                      {item.type === "date" ? (
                        <DatePickerForm field={field} />
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
                Create Blog
              </Button>
            </form>
          </Form>
        </DrawerContent>
      </Drawer>
    </section>
  );
};

export default BlogDrawer;
