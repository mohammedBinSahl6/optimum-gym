import createMiddleware from "next-intl/middleware";

import { defineRouting } from "next-intl/routing";

const routing = defineRouting({
  locales: ["ar"],
  defaultLocale: "ar",
  localePrefix: "never",
});

export default createMiddleware(routing);

export const config = {
  matcher: [],
};
