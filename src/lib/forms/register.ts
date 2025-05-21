import { z } from "zod";
import formSchema from "../zod/register";

export const getFormItems = () => {
  const formItems: Array<{
    label: string;
    name: keyof z.infer<typeof formSchema>;
    type: "text" | "email" | "password";
    placeholder: string;
  }> = [
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      placeholder: "First Name",
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Email",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Password",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
    },
  ];

  return formItems;
};
