import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

const locales = ["en", "ar"];
export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) notFound();
  return {
    messages: (await import(`../i18n/${locale}.json`)).default,
  };
});
