import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/nav-bar/Navbar";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Optimum Gym",
  description: "A gym system for tracking progress, coaching, and competing.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body>
        <Navbar isLoggedIn={Boolean(user)} />
        {children}
      </body>
    </html>
  );
}
