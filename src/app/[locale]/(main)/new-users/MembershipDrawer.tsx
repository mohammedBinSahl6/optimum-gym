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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import formSchema from "@/lib/zod/membership";
import DatePickerForm from "@/components/date-picker/DatePicker";

const formItems: Array<{
  label: string;
  name: keyof z.infer<typeof formSchema>;
  type: "text" | "date";
  placeholder: string;
}> = [
  {
    label: "Plan",
    name: "plan",
    type: "text",
    placeholder: "Plan",
  },
  {
    label: "Height",
    name: "height",
    type: "text",
    placeholder: "Height",
  },
  {
    label: "Weight",
    name: "weight",
    type: "text",
    placeholder: "Weight",
  },
  {
    label: "Start Date",
    name: "startDate",
    type: "date",
    placeholder: "Start Date",
  },
  {
    label: "End Date",
    name: "endDate",
    type: "date",
    placeholder: "End Date",
  },
  {
    label: "Subscription Cost",
    name: "subscriptionCost",
    type: "text",
    placeholder: "Subscription Cost",
  },
];
interface MembershipDrawerProps {
  user: User;
  loading: boolean;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

const MembershipDrawer = ({
  user,
  loading,
  onSubmit,
}: MembershipDrawerProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan: "",
      height: "",
      weight: "",
      startDate: new Date(),
      endDate: new Date(),
      subscriptionCost: "",
    },
  });

  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant="blue">Accept</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create a Membership for {user.firstName}</DrawerTitle>
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
                          value={field.value as string} // Ensure value is a string
                          onChange={(e) => field.onChange(e.target.value)} // Handle change correctly
                        />
                      </FormControl>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button type="submit" disabled={loading} loading={loading}>
              Register
            </Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default MembershipDrawer;
