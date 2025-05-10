/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import formSchema from "../zod/privateSession";

export const getFormItems = (t: any) => {
  const formItems: Array<{
    label: string;
    name: keyof z.infer<typeof formSchema>;
    type: "text" | "date";
    placeholder: string;
  }> = [
    {
      label: t("SessionsNumberLabel"),
      name: "sessions",
      type: "text",
      placeholder: t("SessionsNumberDescription"),
    },
    {
      label: t("StartDateLabel"),
      name: "startDate",
      type: "date",
      placeholder: t("StartDateDescription"),
    },
  ];

  return formItems;
};
