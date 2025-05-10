/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import formSchema from "../zod/login";

export const getFormItems = (t: any) => {
  const formItems: Array<{
    label: string;
    name: keyof z.infer<typeof formSchema>;
    type: "text" | "email" | "password";
    placeholder: string;
  }> = [
    {
      label: t("EmailLabel"),
      name: "email",
      type: "email",
      placeholder: t("EmailLabel"),
    },
    {
      label: t("PasswordLabel"),
      name: "password",
      type: "password",
      placeholder: t("PasswordLabel"),
    },
  ];

  return formItems;
};
