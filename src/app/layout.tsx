import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import Navbar from "@/components/nav-bar/Navbar";
import Loader from "@/components/loader/Loader";
import Provider from "@/components/provider/Provider";

import "./globals.css";
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
  return (
    <html>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Provider>
            <Navbar />
            <Loader />
            {children}
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
