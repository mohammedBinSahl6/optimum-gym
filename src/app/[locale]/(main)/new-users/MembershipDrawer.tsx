"use client";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import {
  CheckCircle,
  CreditCard,
  Calendar,
  Weight,
  DollarSign,
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import type { User } from "@prisma/client";
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
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      subscriptionCost: "",
    },
  });

  const t = useTranslations("NewUsersPage");
  const formItems = getFormItems(t);

  const membershipPlans = [
    {
      value: 'Weight Loss Plan ("Slim & Strong")',
      label: t("CreateMembershipPlanWeightLossPlan"),
      icon: "🏃‍♀️",
      color: "from-green-500 to-green-600",
    },
    {
      value: 'Consistency Commitment ("Session Warrior")',
      label: t("CreateMembershipPlanConsistencyCommitment"),
      icon: "⚡",
      color: "from-blue-500 to-blue-600",
    },
    {
      value: 'Muscle Building Package ("Beast Mode")',
      label: t("CreateMembershipPlanMuscleBuildingPackage"),
      icon: "💪",
      color: "from-red-500 to-red-600",
    },
    {
      value: 'Flexi-Plan ("No-Excuse Membership")',
      label: t("CreateMembershipPlanFlexiPlan"),
      icon: "🎯",
      color: "from-purple-500 to-purple-600",
    },
    {
      value: "90-Day Transformation Challenge",
      label: t("CreateMembershipPlan90DayTransformationChallenge"),
      icon: "🔥",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="bg-gradient-to-r from-primary-blue to-primary-light-blue hover:from-primary-blue/90 hover:to-primary-light-blue/90 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            {t("AcceptButton")}
          </div>
        </Button>
      </DrawerTrigger>

      <DrawerContent className="max-h-[90vh]">
        <div className="mx-auto w-full max-w-4xl">
          <DrawerHeader className="text-center pb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-r from-primary-blue to-primary-light-blue rounded-xl">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <DrawerTitle className="text-2xl font-bold text-primary-blue">
                {t("Createfor")} {user.firstName}
              </DrawerTitle>
            </div>
            <DrawerDescription className="text-primary-blue/70">
              {t("CreateMembershipDescription")}
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-6 pb-6 overflow-y-auto max-h-[60vh]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Membership Plan Selection */}
                <FormField
                  control={form.control}
                  name="plan"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="text-lg font-semibold text-primary-blue flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        {t("CreateMembershipPlan")}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-primary-light/50 focus:border-primary-blue focus:ring-primary-blue/20 rounded-xl h-12">
                            <SelectValue
                              placeholder={t("CreateMembershipPlanPlaceholder")}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {membershipPlans.map((plan) => (
                            <SelectItem key={plan.value} value={plan.value}>
                              <div className="flex items-center gap-3">
                                <span className="text-lg">{plan.icon}</span>
                                <span>{plan.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription className="text-primary-blue/60">
                        Choose the most suitable plan for the member&apos;s
                        fitness goals
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formItems.map((item) => (
                    <FormField
                      key={item.name}
                      control={form.control}
                      name={item.name}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-primary-blue font-medium flex items-center gap-2">
                            {item.name === "height" ||
                            item.name === "weight" ? (
                              <Weight className="w-4 h-4" />
                            ) : item.name === "subscriptionCost" ? (
                              <DollarSign className="w-4 h-4" />
                            ) : (
                              <Calendar className="w-4 h-4" />
                            )}
                            {item.label}
                          </FormLabel>
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
                                value={field.value as string}
                                onChange={(e) => field.onChange(e.target.value)}
                                className="border-primary-light/50 focus:border-primary-blue focus:ring-primary-blue/20 rounded-xl h-12"
                              />
                            </FormControl>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-primary-light/30">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-primary-blue to-primary-light-blue hover:from-primary-blue/90 hover:to-primary-light-blue/90 text-white rounded-xl py-4 font-medium transition-all duration-200 hover:shadow-lg"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating Membership...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        {t("CreateMembershipButton")}
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MembershipDrawer;
