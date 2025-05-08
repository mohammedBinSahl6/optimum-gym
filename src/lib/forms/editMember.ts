/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import formSchema from "../zod/editMember";

export const getFormItems = (t: any) => {
  const formItems: Array<{
    label: string;
    name: keyof z.infer<typeof formSchema>;
    type: "text" | "email" | "date";
    placeholder: string;
  }> = [
    {
      label: t("EditMemberFirstName"),
      name: "firstName",
      type: "text",
      placeholder: t("EditMemberFirstName"),
    },
    {
      label: t("EditMemberLastName"),
      name: "lastName",
      type: "text",
      placeholder: t("EditMemberLastName"),
    },
    {
      label: t("EditMemberFullName"),
      name: "fullName",
      type: "text",
      placeholder: t("EditMemberFullName"),
    },
    {
      label: t("EditMemberEmail"),
      name: "email",
      type: "email",
      placeholder: t("EditMemberEmail"),
    },
    {
      label: t("EditMemberPhoneNumber"),
      name: "phoneNumber",
      type: "text",
      placeholder: t("EditMemberPhoneNumber"),
    },
    {
      label: t("EditMemberNationality"),
      name: "nationality",
      type: "text",
      placeholder: t("EditMemberNationality"),
    },
    {
      label: t("EditMemberDateOfBirth"),
      name: "dateOfBirth",
      type: "date",
      placeholder: t("EditMemberDateOfBirth"),
    },
    {
      label: t("EditMemberAddress"),
      name: "address",
      type: "text",
      placeholder: t("EditMemberAddress"),
    },
    {
      label: t("EditMemberMoreInfo"),
      name: "info",
      type: "text",
      placeholder: t("EditMemberMoreInfo"),
    },
  ];

  return formItems;
};
