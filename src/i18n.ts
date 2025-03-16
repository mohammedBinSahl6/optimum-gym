import messages from "../i18n/ar.json";
import { getRequestConfig } from "next-intl/server";
export default getRequestConfig(async () => {
  return {
    messages,
    locale: "ar",
  };
});
