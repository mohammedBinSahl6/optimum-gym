import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

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
import { getFormItems } from "@/lib/forms/membership";

export const DATE_FOR_2100_YEAR = 4102444800000;
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

  const t = useTranslations("NewUsersPage");
  const formItems = getFormItems(t);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="blue">{t("AcceptButton")}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {t("Createfor")} {user.firstName}
          </DrawerTitle>
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
                  <FormLabel>{t("CreateMembershipPlan")}</FormLabel>
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
                        {t("CreateMembershipPlanWeightLossPlan")}
                      </SelectItem>
                      <SelectItem value='Consistency Commitment ("Session Warrior")'>
                        {t("CreateMembershipPlanConsistencyCommitment")}
                      </SelectItem>
                      <SelectItem value='Muscle Building Package ("Beast Mode")'>
                        {t("CreateMembershipPlanMuscleBuildingPackage")}
                      </SelectItem>
                      <SelectItem value='Flexi-Plan ("No-Excuse Membership")'>
                        {t("CreateMembershipPlanFlexiPlan")}
                      </SelectItem>
                      <SelectItem value="90-Day Transformation Challenge">
                        {t("CreateMembershipPlan90DayTransformationChallenge")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {t("CreateMembershipDescription")}
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
                        modal
                      />
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
              {t("CreateMembershipButton")}
            </Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default MembershipDrawer;
