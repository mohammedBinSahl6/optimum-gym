import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/nav-bar/Navbar";
import Loader from "@/components/loader/Loader";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          <Navbar isLoggedIn={true} />
          <Loader />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
