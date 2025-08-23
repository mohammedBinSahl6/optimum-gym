import type { Metadata } from "next";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import Navbar from "@/components/nav-bar/Navbar";
import Provider from "@/components/provider/Provider";

import "./globals.css";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Optimum Gym",
  description: "A gym system for tracking progress, coaching, and competing.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Provider>
            <Navbar />
            {children}
            <Footer />
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
