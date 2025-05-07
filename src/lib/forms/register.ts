/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import formSchema from "../zod/register";

export const getFormItems = (t: any) => {
  const formItems: Array<{
    label: string;
    name: keyof z.infer<typeof formSchema>;
    type: "text" | "email" | "password";
    placeholder: string;
  }> = [
    {
      label: t('FirstNameLabel'),
      name: "firstName",
      type: "text",
      placeholder: t('FirstNameLabel'),
    },
    {
      label: t('LastNameLabel'),
      name: "lastName",
      type: "text",
      placeholder: t('LastNameLabel'),
    },
    {
      label: t('EmailLabel'),
      name: "email",
      type: "email",
      placeholder: t('EmailLabel'),
    },
    {
      label: t('PasswordLabel'),
      name: "password",
      type: "password",
      placeholder: t('PasswordLabel'),
    },
    {
      label: t('ConfirmPasswordLabel'),
      name: "confirmPassword",
      type: "password",
      placeholder: t('ConfirmPasswordLabel'),
    },
  ];

  return formItems;
};
