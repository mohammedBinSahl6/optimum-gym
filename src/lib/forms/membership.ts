/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import formSchema from "../zod/membership";

export const getFormItems = (t: any) => {
  const formItems: Array<{
    label: string;
    name: keyof z.infer<typeof formSchema>;
    type: "text" | "date";
    placeholder: string;
  }> = [
    {
      label: t("EditMembershipHeight"),
      name: "height",
      type: "text",
      placeholder: t("EditMembershipHeight"),
    },
    {
      label: t("EditMembershipWeight"),
      name: "weight",
      type: "text",
      placeholder: t("EditMembershipWeight"),
    },
    {
      label: t("EditMembershipStartDate"),
      name: "startDate",
      type: "date",
      placeholder: t("EditMembershipStartDate"),
    },
    {
      label: t("EditMembershipEndDate"),
      name: "endDate",
      type: "date",
      placeholder: t("EditMembershipEndDate"),
    },
    {
      label: t("EditMembershipSubscriptionCost"),
      name: "subscriptionCost",
      type: "text",
      placeholder: t("EditMembershipSubscriptionCost"),
    },
  ];

  return formItems;
};
