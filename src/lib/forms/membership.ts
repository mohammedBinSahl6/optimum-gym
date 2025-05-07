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
      label: t("MembershipHeight"),
      name: "height",
      type: "text",
      placeholder: t("MembershipHeight"),
    },
    {
      label: t("MembershipWeight"),
      name: "weight",
      type: "text",
      placeholder: t("MembershipWeight"),
    },
    {
      label: t("MembershipStartDate"),
      name: "startDate",
      type: "date",
      placeholder: t("MembershipStartDate"),
    },
    {
      label: t("MembershipEndDate"),
      name: "endDate",
      type: "date",
      placeholder: t("MembershipEndDate"),
    },
    {
      label: t("MembershipSubscriptionCost"),
      name: "subscriptionCost",
      type: "text",
      placeholder: t("MembershipSubscriptionCost"),
    },
  ];

  return formItems;
};
