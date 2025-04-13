/* eslint-disable react/no-unescaped-entities */
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
import formSchema from "@/lib/zod/membership";
import DatePickerForm from "@/components/date-picker/DatePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formItems: Array<{
  label: string;
  name: keyof z.infer<typeof formSchema>;
  type: "text" | "date";
  placeholder: string;
}> = [
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
      <DrawerTrigger asChild>
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
            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='Weight Loss Plan ("Slim & Strong")'>
                        Weight Loss Plan ("Slim & Strong")
                      </SelectItem>
                      <SelectItem value='Consistency Commitment ("Session Warrior")'>
                        Consistency Commitment ("Session Warrior")
                      </SelectItem>
                      <SelectItem value='Muscle Building Package ("Beast Mode")'>
                        Muscle Building Package ("Beast Mode")
                      </SelectItem>
                      <SelectItem value='Flexi-Plan ("No-Excuse Membership")'>
                        Flexi-Plan ("No-Excuse Membership")
                      </SelectItem>
                      <SelectItem value="90-Day Transformation Challenge">
                        90-Day Transformation Challenge
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    membership plan options for gym subscribers, categorized by
                    different fitness goals:
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
              Create Membership
            </Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default MembershipDrawer;
