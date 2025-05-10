import React from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { useForm } from "react-hook-form";

import DatePickerForm from "@/components/date-picker/DatePicker";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import formSchema from "@/lib/zod/membership";
import { MemberInfo } from "@prisma/client";
import { updateMembership } from "@/app/actions/updateMembership";
import { getFormItems } from "@/lib/forms/membership";

const EditMembershipInfo = ({
  membership,
  setIsEdit,
}: {
  membership: MemberInfo;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      endDate: membership.endDate,
      height: String(membership.height),
      plan: membership.plan,
      startDate: membership.startDate,
      subscriptionCost: String(membership.subscriptionCost),
      weight: String(membership.weight),
    },
  });

  const t = useTranslations("EditMemberPage");
  const formItems = getFormItems(t);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const response = await updateMembership(membership.id, values);
    setLoading(false);
    if (response.success) {
      setIsEdit(false);
      toast.success(t("EditMembershipSuccessMessage"));
    } else {
      toast.error(t("EditMembershipErrorMessage"));
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-2"
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
                    <DatePickerForm
                      field={field}
                      fromDate={new Date(0)}
                      toDate={new Date()}
                    />
                  ) : (
                    <FormControl>
                      <Input
                        placeholder={item.placeholder}
                        {...field}
                        type={item.type}
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
          <FormField
            control={form.control}
            name="plan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("EditMembershipPlan")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="max-w-[340px] w-full">
                      <SelectValue
                        placeholder={t("EditMembershipPlanPlaceholder")}
                        defaultValue={membership.plan}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='Weight Loss Plan ("Slim & Strong")'>
                      {t("EditMembershipPlanWeightLossPlan")}
                    </SelectItem>
                    <SelectItem value='Consistency Commitment ("Session Warrior")'>
                      {t("EditMembershipPlanConsistencyCommitment")}
                    </SelectItem>
                    <SelectItem value='Muscle Building Package ("Beast Mode")'>
                      {t("EditMembershipPlanMuscleBuildingPackage")}
                    </SelectItem>
                    <SelectItem value='Flexi-Plan ("No-Excuse Membership")'>
                      {t("EditMembershipPlanFlexiPlan")}
                    </SelectItem>
                    <SelectItem value="90-Day Transformation Challenge">
                      {t("EditMembershipPlan90DayTransformationChallenge")}
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="blue"
            type="submit"
            disabled={loading}
            loading={loading}
          >
            {t("UpdateButton")}
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => setIsEdit(false)}
            disabled={loading}
          >
            {t("CancelButton")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditMembershipInfo;
