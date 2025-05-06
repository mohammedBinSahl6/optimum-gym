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
import { User } from "@prisma/client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import formSchema from "@/lib/zod/privateSession";
import DatePickerForm from "@/components/date-picker/DatePicker";

import { MembersCombobox } from "./MembersCombobox";
import { DATE_FOR_2100_YEAR } from "../new-users/MembershipDrawer";
import { useTranslations } from "next-intl";
import { getFormItems } from "@/lib/forms/privateSession";

interface MembershipDrawerProps {
  user: User;
  loading: boolean;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

const PrivateSessionDrawer = ({
  user,
  loading,
  onSubmit,
}: MembershipDrawerProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      member: "",
      sessions: "",
      startDate: new Date(),
    },
  });

  const t = useTranslations("DashboardPage");
  const formItems = getFormItems(t);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="blue">{t("CreatePrivateSessionFormTrigger")}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {t("PrivateSessionFormTitle")} {user.firstName}
          </DrawerTitle>
        </DrawerHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-3 max-w-sm md:max-w-full p-10"
          >
            <FormField
              control={form.control}
              name="member"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>{t("MembersComboboxLabel")}</FormLabel>
                  <MembersCombobox
                    onChange={field.onChange}
                    val={field.value}
                    form={form}
                  />
                  <FormDescription>
                    {t("MembersComboboxDescription")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {formItems.map((item) => (
              <FormField
                key={item.name}
                control={form.control}
                name={item.name}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>{item.label}</FormLabel>
                    {item.type === "date" ? (
                      <DatePickerForm
                        field={field}
                        fromDate={new Date()}
                        toDate={new Date(DATE_FOR_2100_YEAR)}
                      />
                    ) : (
                      <FormControl>
                        <Input
                          placeholder={item.placeholder}
                          {...field}
                          type={item.type as "text"}
                          value={field.value as string} // Ensure value is a string
                          onChange={(e) => field.onChange(e.target.value)} // Handle change correctly
                          className="max-w-[340px] w-full"
                        />
                      </FormControl>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button type="submit" disabled={loading} loading={loading}>
              {t("CreatePrivateSessionFormButton")}
            </Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default PrivateSessionDrawer;
