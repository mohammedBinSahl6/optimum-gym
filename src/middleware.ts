import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "ar"],

  defaultLocale: "en",
});
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|icons|apple-touch-icon.png|manifest|favicon.ico|favicon.svg).*)",
    "/(ar|en)/((?!api|_next/static|_next/image|assets|icons|apple-touch-icon.png|manifest|favicon.ico|favicon.svg).*)",
  ],
};
